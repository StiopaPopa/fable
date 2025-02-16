"use client";
import { useEffect, useState } from "react";

export default function VideoDemo() {
  // Start with local fallback
  const [videoUrl, setVideoUrl] = useState("./default.mp4");

  useEffect(() => {
    // Poll every 5s to see if a new video is ready
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:8000/video/latest");
        const data = await res.json();
        console.log("Fetched video data:", data); // DEBUG
        if (data.video_url) {
          // If it's different from the current URL, update state
          if (data.video_url !== videoUrl) {
            console.log("Setting new videoUrl:", data.video_url);
            setVideoUrl(data.video_url);
          }
        }
      } catch (err) {
        console.error("Failed to fetch latest video:", err);
      }
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [videoUrl]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        <video
          key={videoUrl} // forces re-mount if URL changes
          width="960"
          height="540"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          style={{ borderRadius: "12px", display: "block" }}
        >
          {/* Add a query param to bust any caching */}
          <source src={`${videoUrl}?t=${Date.now()}`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
