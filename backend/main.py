import random
import math
import threading
from queue import Queue
import asyncio
import time
from collections import Counter
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pythonosc import dispatcher, osc_server
import openai
from openai import OpenAI
import os
from dotenv import load_dotenv, dotenv_values 
from elevenlabs import stream
from elevenlabs.client import ElevenLabs

# 1) Import Luma AI
from lumaai import LumaAI

load_dotenv()

# ---------------------------
# Global Settings & Variables
# ---------------------------
ip = os.getenv("IP")  # e.g., "0.0.0.0" or "127.0.0.1"
port = 5000

# For your OpenAI key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

tts_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))


possible_ids = [
    "LruHrtVF6PSyGItzMNHS"
]
idx = random.randint(0,len(possible_ids) - 1)

VOICE_ID = possible_ids[idx]
MODEL_ID = "eleven_multilingual_v2"

# Luma AI client
luma_client = LumaAI(auth_token=os.getenv("LUMA_AI_TOKEN"))

# Global data arrays (if needed for smoothing, etc.)
tts_queue = Queue()
plot_val_count = 200
alpha_beta_ratios = []
smoothed_ratios = []
ema_alpha = 0.2  # Weight for exponential moving average

# Global state for classification (latest instantaneous classification)
latest_state = "NEUTRAL"
latest_smoothed_ratio = None

# EEG variables
hsi = [4, 4, 4, 4]
abs_waves = [-1, -1, -1, -1, -1]
rel_waves = [-1, -1, -1, -1, -1]

# Lock for thread-safe operations
data_lock = threading.Lock()

# =============== For 30s Aggregation + Story ===============
data_log = []  # will hold tuples of (timestamp, "FOCUSING"/"RELAXING"/"NEUTRAL")
story_so_far = ""
story_lock = threading.Lock()  # if we want to lock around story text

# This toggles if you want "meditative" style stories or not
MEDITATE = False

# 2) Store the latest video URL for the frontend
latest_video_url = None

# ---------------------------
# Smoothing & Classification
# ---------------------------
def exponential_moving_average(data, alpha=0.2):
    """Compute EMA on the last data point in 'data' list."""
    if not smoothed_ratios:
        return data[-1]
    return alpha * data[-1] + (1 - alpha) * smoothed_ratios[-1]

def classify_focus_vs_relaxation(smoothed_value):
    """
    Determine the mental state based on the smoothed ratio.
    Example thresholds:
      - < 1.4 => FOCUSING
      - > 2.0 => RELAXING
      - else  => NEUTRAL
    """
    if smoothed_value is None:
        return "NEUTRAL"  # no data yet

    if smoothed_value < 1.4:
        return "FOCUSING"
    elif smoothed_value > 2.0:
        return "RELAXING"
    else:
        return "NEUTRAL"

def get_label_for_last_30_seconds():
    """
    Returns the most common label from the last 30 seconds in data_log.
    If there's insufficient data, return 'NEUTRAL'.
    """
    cutoff = time.time() - 30.0
    with data_lock:
        recent_labels = [label for (t, label) in data_log if t >= cutoff]
    if len(recent_labels) < 5:
        return "NEUTRAL"
    counter = Counter(recent_labels)
    most_common_label, _ = counter.most_common(1)[0]
    return most_common_label

# ---------------------------
# OPENAI & Story Generation
# ---------------------------
def generate_next_segment(mental_state, previous_story):
    """
    Generate the next chunk (~60 words for ~30 seconds of speech).
    Adjust the prompt depending on MEDITATE or not.
    """

    if not previous_story:
        previous_part_text = (
            "This is the beginning of the story. There's no previous section yet."
        )
    else:
        previous_part_text = f"Previous part of the story:\n\"\"\"{previous_story}\"\"\""

    # Example meditation or normal story:
    if MEDITATE:
        prompt = f"""
You are a skilled, soothing meditation guide and storyteller. The user's current mental state is {mental_state}.
- If NEUTRAL, gently guide them toward deeper relaxation.
- If FOCUSING, channel that focus into mindful awareness.
- If RELAXING, encourage them to explore peaceful sensations more fully.

Continue the meditation story from the previous section, seamlessly adapting to the user's current state.
Write ~60 words in a calm, flowing tone. Avoid breaking the fourth wall.

{previous_part_text}

What happens next?
"""
    else:
        prompt = f"""
You are a masterful, imaginative storyteller who crafts plots that adapt to the user's mental state.
That state is {mental_state}, which can be NEUTRAL, FOCUSING, or RELAXING.
- If NEUTRAL, steer the story toward new discoveries, piquing curiosity.
- If FOCUSING, channel that concentration to reveal details or challenges, adding tension.
- If RELAXING, deepen a sense of ease and wonder, letting the adventure flow gently.

Continue the story from the previous section, focusing on developing the plot and aligning with the user's mental state.
Aim for ~60 words (about 30 seconds of speech at 120 WPM).
Keep the style engaging, immersive, and continuous. Avoid breaking the fourth wall.

{previous_part_text}

What happens next?
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # or "gpt-4" or "gpt-3.5-turbo" if you have access
            messages=[{"role": "system", "content": prompt.strip()}],
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print("OpenAI error:", e)
        return "[OpenAI Error]"

# ---------------------------
# Text-to-Speech Loop
# ---------------------------
def tts_loop():
    while True:
        text_segment = tts_queue.get()
        try:
            audio_stream = tts_client.text_to_speech.convert_as_stream(
                text=text_segment,
                voice_id=VOICE_ID,
                model_id=MODEL_ID
            )
            stream(audio_stream)
        except Exception as e:
            print(f"Error in TTS playback: {e}")
        finally:
            tts_queue.task_done()

# ---------------------------
# Luma AI Video Generation
# ---------------------------
def get_last_paragraphs(full_text, n=3):
    """
    Utility: returns the last `n` paragraphs/lines of the story so far,
    so we can use it as a prompt for Luma AI.
    """
    lines = [p.strip() for p in full_text.strip().split("\n") if p.strip()]
    return "\n".join(lines[-n:])

def generate_luma_video():
    """
    Generate a video from the last few paragraphs of `story_so_far`.
    Blocks until the video is complete, then stores it in `latest_video_url`.
    """
    global story_so_far
    global latest_video_url

    # Get last few paragraphs from story
    with story_lock:
        prompt_text = get_last_paragraphs(story_so_far, n=2)

    print(f"Generating Luma video with prompt:\n{prompt_text}\n")

    try:
        generation = luma_client.generations.create(prompt=prompt_text)

        # Wait for completion
        while True:
            generation = luma_client.generations.get(id=generation.id)
            if generation.state == "completed":
                latest_video_url = generation.assets.video
                print(f"New Luma AI video: {latest_video_url}")
                break
            elif generation.state == "failed":
                print(f"Luma AI generation failed: {generation.failure_reason}")
                break
            print("Luma AI is dreaming...")
            time.sleep(3)

    except Exception as e:
        print(f"Luma AI error: {e}")

# ---------------------------
# The Main Story Loop
# ---------------------------
def story_loop():
    """
    Flow:
      1) Immediately generate a 30s segment.
      2) Wait 15s, generate next segment.
      3) Each time a new segment is generated, also create a Luma AI video in a separate thread.
    """
    global story_so_far

    # Generate first chunk right away
    mental_state = get_label_for_last_30_seconds()
    new_segment = generate_next_segment(mental_state, story_so_far)
    with story_lock:
        story_so_far += "\n" + new_segment
    print(f"\n=== FIRST STORY SEGMENT (Mental State: {mental_state}) ===\n{new_segment}\n")

    # Put that text in the TTS queue
    tts_queue.put(new_segment)

    # Also generate a video (in a background thread so TTS is not blocked)
    threading.Thread(target=generate_luma_video, daemon=True).start()

    # Wait 15 seconds
    time.sleep(15)

    while True:
        mental_state = get_label_for_last_30_seconds()
        new_segment = generate_next_segment(mental_state, story_so_far)
        with story_lock:
            story_so_far += "\n" + new_segment

        print(f"\n=== NEW STORY SEGMENT (Mental State: {mental_state}) ===\n{new_segment}\n")

        # Send text to TTS
        tts_queue.put(new_segment)

        # Fire off Luma AI video generation
        threading.Thread(target=generate_luma_video, daemon=True).start()
        time.sleep(30)

# ---------------------------
# OSC Handlers
# ---------------------------
def hsi_handler(address: str, *args):
    global hsi
    hsi = args
    if sum(args) == 4:
        print("Muse Fit Good")
    else:
        print("Muse Fit Bad")

def abs_handler(address: str, *args):
    """
    Process incoming absolute wave data.
    Example: We get an index in args[0][0], wave amplitude in args[1].
    """
    global abs_waves, rel_waves, alpha_beta_ratios, smoothed_ratios
    global latest_smoothed_ratio, latest_state, data_log

    wave = args[0][0]
    
    if len(args) == 2:
        abs_waves[wave] = args[1]
    
    # Convert from dB to linear (example)
    try:
        rel_waves[wave] = math.pow(10, abs_waves[wave])
    except:
        rel_waves[wave] = 0

    # When alpha wave (index=2) is updated, compute ratio
    if wave == 2:
        alpha = rel_waves[2]
        beta = rel_waves[3] if rel_waves[3] > 0 else 0.001
        ratio = alpha / beta

        with data_lock:
            alpha_beta_ratios.append(ratio)
            alpha_beta_ratios[:] = alpha_beta_ratios[-plot_val_count:]

            smoothed = exponential_moving_average(alpha_beta_ratios, ema_alpha)
            smoothed_ratios.append(smoothed)
            smoothed_ratios[:] = smoothed_ratios[-plot_val_count:]
            latest_smoothed_ratio = smoothed

            # Instant classification
            state = classify_focus_vs_relaxation(smoothed)
            latest_state = state

            # Save to data_log with a timestamp for 30s aggregation
            timestamp = time.time()
            data_log.append((timestamp, state))
            # Prune old data beyond ~60s
            cutoff = timestamp - 60
            while data_log and data_log[0][0] < cutoff:
                data_log.pop(0)

            print(f"Smoothed Ratio: {smoothed:.2f} | State: {latest_state}")

# ---------------------------
# OSC Server Thread
# ---------------------------
def run_osc_server():
    osc_dispatcher = dispatcher.Dispatcher()
    osc_dispatcher.map("/muse/elements/horseshoe", hsi_handler)
    osc_dispatcher.map("/muse/elements/delta_absolute", abs_handler, 0)
    osc_dispatcher.map("/muse/elements/theta_absolute", abs_handler, 1)
    osc_dispatcher.map("/muse/elements/alpha_absolute", abs_handler, 2)
    osc_dispatcher.map("/muse/elements/beta_absolute",  abs_handler, 3)
    osc_dispatcher.map("/muse/elements/gamma_absolute", abs_handler, 4)

    server = osc_server.ThreadingOSCUDPServer((ip, port), osc_dispatcher)
    print(f"OSC Server listening on {ip}:{port}")
    server.serve_forever()


# ---------------------------
# FastAPI Application Setup
# ---------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Fable is up and running!"}

# (1) Start the OSC server
# (2) Start the story generation loop
# (3) Start TTS playback loop
@app.on_event("startup")
def startup_event():
    osc_thread = threading.Thread(target=run_osc_server, daemon=True)
    osc_thread.start()

    story_thread = threading.Thread(target=story_loop, daemon=True)
    story_thread.start()

    tts_thread = threading.Thread(target=tts_loop, daemon=True)
    tts_thread.start()

    print("Started OSC, story, and TTS threads.")

# ---------------------------
# WebSocket to Stream EEG State
# ---------------------------
@app.websocket("/ws/eeg")
async def websocket_eeg(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            with data_lock:
                data = {
                    "state": latest_state,
                    "smoothed_ratio": latest_smoothed_ratio,
                }
            await websocket.send_json(data)
            await asyncio.sleep(0.5)  # Update interval
    except WebSocketDisconnect:
        print("WebSocket client disconnected.")

# ---------------------------
# Get Story
# ---------------------------
@app.get("/story")
def get_story():
    """
    Returns the accumulated story so far.
    """
    with story_lock:
        return {"story": story_so_far}

# ---------------------------
# Get the Latest Video
# ---------------------------
@app.get("/video/latest")
def get_latest_video():
    """
    Returns the most recently generated Luma AI video URL.
    """
    global latest_video_url
    return {"video_url": latest_video_url}
