import EEGStream from "./components/EEGStream";
import AnimatedBackground from "./components/AnimatedBackground";
import StoryView from "./components/StoryView";
import VideoDemo from "./components/VideoDemo";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <EEGStream />
        <VideoDemo />
        {/* <StoryView /> */}
      </div>
      {/* Footer title overlay */}
      <div className="pointer-events-none absolute bottom-0 w-full flex justify-center">
        <div className="relative">
          {/* The gradient overlay to partially cover the title */}
          <div className="absolute inset-0"></div>
          <h1
            className="relative text-9xl font-extrabold tracking-tight text-gray-500 opacity-40"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Fable
          </h1>
        </div>
      </div>
    </>
  );
}
