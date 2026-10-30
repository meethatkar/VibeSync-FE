import React from "react";
import { ShieldCheck, Cpu, Database, EyeOff, Radio, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12 lg:p-16 max-w-5xl mx-auto">
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="gap-2 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full text-xs font-mono uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Terminal
        </Button>
      </div>

      <div className="space-y-4 mb-12 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 text-xs font-mono uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          Technical Architecture & Privacy Disclosure
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          System Specifications & Terms
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          VibePulse is an autonomous bio-acoustic music harmonizer designed as a high-performance demonstration of real-time computer vision and modern web engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 space-y-3">
          <div className="w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white">
            <EyeOff className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">100% Client-Side Privacy</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            All facial landmark detection and micro-expression vector calculations occur strictly inside the browser client via Google MediaPipe WebAssembly. No webcam pixels, frames, or biometric vectors ever depart the local client session.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 space-y-3">
          <div className="w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Biometric Acoustic Mapping</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Facial blend shapes are mapped into emotional confidence coefficients (Smile, Brow Depression, Eye Aperture) that synchronize audio playback to your real-time physiological status.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 space-y-3">
          <div className="w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Resilient Hybrid Data Pipeline</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Engineered with a fault-tolerant hybrid data tier: directly queries MongoDB Express API when available, and smoothly engages local high-fidelity audio buffers during network partitioning or offline reviews.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 space-y-3">
          <div className="w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white">
            <Radio className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Audio Licensing Notice</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Audio stems and musical arrangements showcased in this portfolio project are utilized under Creative Commons / fair academic evaluation terms for non-commercial proof-of-work demonstrations.
          </p>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950 text-center space-y-4">
        <p className="text-zinc-400 text-sm font-mono">
          Ready to experience the bio-acoustic synchronization?
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 py-3 rounded-full"
        >
          Launch Bio-Scanner
        </Button>
      </div>
    </div>
  );
};

export default TermsPage;
