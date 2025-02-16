"use client";
import React, { useState, useEffect } from "react";

export default function EEGStatus() {
  const [state, setState] = useState("No data yet");
  const [ratio, setRatio] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/eeg");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setState(data.state);
      setRatio(data.smoothed_ratio);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-200 mb-4 text-center">
        EEG Mental State
      </h1>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">State:</span>
          <span className="text-gray-100">{state}</span>
        </div>
        {ratio !== null && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Smoothed Ratio:</span>
            <span className="text-gray-100">{ratio.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
