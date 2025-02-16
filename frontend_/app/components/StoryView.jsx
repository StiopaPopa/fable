"use client";
import React, { useEffect, useState, useRef } from "react";

export default function StoryView() {
  const [story, setStory] = useState("");
  const audioRef = useRef(null);

  // Poll the /story endpoint
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch("http://localhost:8000/story");
        if (res.ok) {
          const data = await res.json();
          setStory(data.story);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    // Fetch immediately, then poll every 5s
    fetchStory();
    const interval = setInterval(fetchStory, 5000);
    return () => clearInterval(interval);
  }, []);

  // On button click, fetch TTS audio from /story_audio, then play
  const handlePlayAudio = async () => {
    try {
      const response = await fetch("http://localhost:8000/story_audio");
      if (!response.ok) {
        throw new Error("Failed to fetch TTS audio");
      }
      // Convert to blob
      const blob = await response.blob();
      // Create a local URL
      const audioURL = URL.createObjectURL(blob);

      // Assign to the audio element and play
      if (audioRef.current) {
        audioRef.current.src = audioURL;
        audioRef.current.play();
      }
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  console.log("Current story text:", story);

  return (
    <div>
      <h1>Dynamic Story</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{story}</p>
    </div>
  );
}
