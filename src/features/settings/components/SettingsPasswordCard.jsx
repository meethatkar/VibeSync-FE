import React, { useState } from "react";
import { Badge, Card, CardHeader } from "./SettingsUI";
import { RefreshCw, Mail, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { showSuccessToast } from "../../../utils/toast";

export const SettingsPasswordCard = () => {
  const { user } = useAuth();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleUpdate = () => {
    showSuccessToast("Security credentials successfully rotated!");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <Card className="h-full bg-zinc-950/80 border-zinc-800">
      <CardHeader 
        title="Credential Security" 
        icon={RefreshCw} 
        rightElement={<Badge variant="default" className="py-0.5 px-2.5">AUTHENTICATED</Badge>}
      />
      
      <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
        Update authentication credentials. Biometric and session encryption keys are locally isolated.
      </p>

      <div className="space-y-6">
        {/* Step 1: OTP / Verification */}
        <div className="bg-black rounded-xl p-4 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="ghost" className="text-[10px] px-2 py-0.5 font-mono">STEP 1</Badge>
              <span className="text-xs font-mono font-medium text-zinc-300">Authorization Code</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Expires in <span className="text-white">04:59</span>
            </div>
          </div>
          
          <p className="text-xs text-zinc-500 mb-4 leading-relaxed font-mono">
            Verification channel: <span className="text-zinc-300">{user?.email || "demo@vibepulse.ai"}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-zinc-500" />
              </div>
              <input 
                type="text" 
                defaultValue="849201"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white font-mono tracking-[0.2em] focus:outline-none focus:border-white transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-zinc-900 text-zinc-300 text-xs font-mono uppercase px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-800">
              <RefreshCw className="w-3.5 h-3.5" /> Resend
            </button>
            <div className="flex items-center justify-center gap-1.5 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {/* Step 2: Passwords */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="ghost" className="text-[10px] px-2 py-0.5 font-mono">STEP 2</Badge>
            <span className="text-xs font-mono font-medium text-zinc-300">Set New Security Phrase</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-1">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">New Phrase</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New phrase"
                  className="w-full bg-black border border-zinc-800 rounded-xl py-2.5 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">Confirm Phrase</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat phrase"
                  className="w-full bg-black border border-zinc-800 rounded-xl py-2.5 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2 font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Entropy Index</span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Strong (256-bit)</span>
            </div>
            <div className="flex gap-1.5 h-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex-1 bg-white rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleUpdate}
          className="bg-white hover:bg-zinc-200 text-black text-xs font-mono uppercase tracking-wider font-semibold py-2.5 px-6 rounded-full transition-colors"
        >
          Update Credentials
        </button>
      </div>
    </Card>
  );
};

