import React from "react";
import { Activity, Radio, ScanLine } from "lucide-react";

const ScannerCard = ({
  isCameraReady,
  videoRef,
  isDetecting,
  displayEmotion,
  currentSongName,
}) => {
  return (
    <div className="flex-1 w-full max-w-2xl relative font-sans">
      <div className="relative bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isCameraReady ? "bg-white animate-ping" : "bg-zinc-600"
              }`}
            ></div>
            <span className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
              Sensor Viewport // 01
            </span>
          </div>
          <div
            className={`border text-[10px] font-mono font-bold px-3 py-1 rounded-full tracking-widest uppercase ${
              isCameraReady
                ? "border-white text-white bg-white/10"
                : "border-zinc-800 text-zinc-400 bg-zinc-900/60"
            }`}
          >
            {isCameraReady ? "Facial Resonance Active" : "Standby Mode"}
          </div>
        </div>

        {/* Video / Sensor Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black flex items-center justify-center">
          {!isCameraReady && (
            <div className="flex flex-col items-center justify-center gap-3 text-center p-6 text-zinc-500">
              <div className="w-16 h-16 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400">
                <ScanLine className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Optical Sensor Inactive
                </p>
                <p className="text-xs text-zinc-600 max-w-xs">
                  Click Launch Bio-Scan or select an interactive mood to tune frequencies
                </p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transform -scale-x-100 ${
              isCameraReady ? "block" : "hidden"
            }`}
          />

          {/* Viewfinder Target Overlays */}
          {isCameraReady && (
            <>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono text-zinc-300 tracking-widest uppercase">
                Biometric Mesh: 478 Points
              </div>

              {/* Viewfinder Corner Brackets */}
              <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-white/80"></div>
              <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-white/80"></div>
              <div className="absolute bottom-16 left-6 w-5 h-5 border-b-2 border-l-2 border-white/80"></div>
              <div className="absolute bottom-16 right-6 w-5 h-5 border-b-2 border-r-2 border-white/80"></div>
            </>
          )}

          {/* Live Detected Emotion Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/90 px-3 py-1.5 rounded-full border border-zinc-800">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDetecting ? "bg-white animate-pulse" : "bg-zinc-600"
                }`}
              ></span>
              <span className="text-zinc-200 text-xs font-mono uppercase tracking-wider">
                Resonance: <strong className="text-white">{displayEmotion}</strong>
              </span>
            </div>
            {isCameraReady && (
              <div className="hidden sm:flex items-center gap-1.5 bg-black/90 px-2.5 py-1 rounded-full border border-zinc-800 text-[10px] font-mono text-zinc-400">
                <Radio className="w-3 h-3 text-white" />
                <span>60 FPS</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer - Acoustic Harmonic Match */}
        <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl p-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">
                Acoustic Frequency Match
              </span>
              <span className="text-white text-sm font-semibold truncate">
                {currentSongName || "Euphoric Alpha Flow"}
              </span>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
              Audio Node
            </span>
            <span className="text-xs text-white font-mono">Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerCard;

