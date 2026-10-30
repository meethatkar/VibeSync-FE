import React from "react";
import { Video, ShieldCheck, Pause, Sparkles } from "lucide-react";
import { Button } from "../../../../components/ui/button";

const HeroLeftContent = ({ isCameraReady, onLaunchScan, onStopScan, onSimulateMood, currentEmotion }) => {
  const quickMoods = [
    { label: "Radiant Joy", value: "happy" },
    { label: "Deep Focus", value: "neutral" },
    { label: "Serene Calm", value: "calm" },
    { label: "Melancholy", value: "sad" },
    { label: "High Energy", value: "angry" },
  ];

  return (
    <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl font-sans">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 text-xs font-mono uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        Real-Time Bio-Acoustic Engine
      </div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight font-heading">
        Music Synced To Your <br />
        <span className="text-white underline decoration-zinc-700 decoration-4 underline-offset-8">
          Emotion
        </span>
      </h1>

      <p className="text-zinc-400 text-base sm:text-lg max-w-lg leading-relaxed">
        VibePulse evaluates micro-expressions and facial blend shapes via your camera feed to dynamically synchronize acoustic frequencies with your emotional state in real time.
      </p>

      {/* Primary Action Button */}
      <div className="flex flex-col gap-4 mt-2 w-full sm:w-auto">
        <Button
          onClick={isCameraReady ? onStopScan : onLaunchScan}
          className={`w-fit gap-3 font-semibold px-8 py-6 text-base sm:text-lg rounded-full transition-all group ${
            isCameraReady
              ? "bg-zinc-900 text-white border border-white hover:bg-zinc-800"
              : "bg-white text-black hover:bg-zinc-200 border border-white"
          }`}
        >
          {isCameraReady ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              Pause Bio-Scan
            </>
          ) : (
            <>
              <Video className="w-5 h-5 fill-current" />
              Launch Bio-Scan
              <span className="group-hover:translate-x-1 transition-transform ml-1">
                →
              </span>
            </>
          )}
        </Button>

        {/* Instant Simulator Pills for Recruiters / Reviewers without camera access */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Interactive Simulator (Click to Trigger Mood):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickMoods.map((m) => {
              const isActive = (currentEmotion || "").toLowerCase() === m.value;
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => onSimulateMood && onSimulateMood(m.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono pt-2">
          <ShieldCheck className="w-4 h-4 text-zinc-300" />
          <span>
            100% Client-Side WebAssembly. Zero video frames leave your browser.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroLeftContent;

