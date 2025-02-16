import math
import threading
import asyncio

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pythonosc import dispatcher, osc_server

# ---------------------------
# Global Settings & Variables
# ---------------------------
ip = "10.35.0.192"  # Your IP address (update as needed)
port = 5000

# Global data arrays (if needed for smoothing, etc.)
plot_val_count = 200
alpha_beta_ratios = []
smoothed_ratios = []
ema_alpha = 0.2  # Weight for exponential moving average

# Global state for classification
latest_state = "NEUTRAL"
latest_smoothed_ratio = None

# EEG variables (as in your original code)
hsi = [4, 4, 4, 4]
abs_waves = [-1, -1, -1, -1, -1]
rel_waves = [-1, -1, -1, -1, -1]

# Lock for thread-safe operations
data_lock = threading.Lock()

# ---------------------------
# Smoothing & Classification Functions
# ---------------------------
def exponential_moving_average(data, alpha=0.2):
    """Compute the exponential moving average (EMA) of the last data point."""
    if not smoothed_ratios:
        return data[-1]
    return alpha * data[-1] + (1 - alpha) * smoothed_ratios[-1]

def classify_focus_vs_relaxation(smoothed_value):
    """Determine the mental state based on the smoothed ratio."""
    global latest_state
    if smoothed_value < 1.4:
        latest_state = "FOCUSING"
    elif smoothed_value > 2:
        latest_state = "RELAXING"
    else:
        latest_state = "NEUTRAL"

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
    This example assumes that the OSC message includes an index (0-4) as the first element,
    and the wave's amplitude as the second.
    """
    global abs_waves, rel_waves, alpha_beta_ratios, smoothed_ratios, latest_smoothed_ratio

    # Extract which wave is being updated (0 to 4)
    wave = args[0][0]
    
    # Update absolute wave value (adapt if your OSC format is different)
    if len(args) == 2:
        abs_waves[wave] = args[1]
    
    # Dummy relative wave conversion (replace with your actual conversion logic)
    try:
        rel_waves[wave] = math.pow(10, abs_waves[wave])
    except Exception:
        rel_waves[wave] = 0

    # When the alpha wave (index 2) is updated, compute the ratios
    if wave == 2:
        alpha = rel_waves[2]
        # Ensure beta (index 3) is nonzero
        beta = rel_waves[3] if rel_waves[3] > 0 else 0.001
        ratio = alpha / beta

        with data_lock:
            alpha_beta_ratios.append(ratio)
            alpha_beta_ratios[:] = alpha_beta_ratios[-plot_val_count:]
            
            smoothed = exponential_moving_average(alpha_beta_ratios, ema_alpha)
            smoothed_ratios.append(smoothed)
            smoothed_ratios[:] = smoothed_ratios[-plot_val_count:]
            latest_smoothed_ratio = smoothed

            classify_focus_vs_relaxation(smoothed)
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

# Enable CORS for your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Fable is up and running!"}

# Start the OSC server in a background thread at startup
@app.on_event("startup")
def startup_event():
    osc_thread = threading.Thread(target=run_osc_server, daemon=True)
    osc_thread.start()
    print("Started OSC server thread.")

# ---------------------------
# WebSocket Endpoint to Stream Classification
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
            await asyncio.sleep(0.5)  # Update interval (adjust as needed)
    except WebSocketDisconnect:
        print("WebSocket client disconnected.")
