import React, { useState } from "react";
import { Badge, Card, CardHeader } from "./SettingsUI";
import { UserCircle, AtSign } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { showSuccessToast } from "../../../utils/toast";

export const SettingsPublicHandleCard = () => {
  const { user } = useAuth();
  const [handle, setHandle] = useState(user?.username || "guest_reviewer");

  const handleSave = () => {
    showSuccessToast(`Handle "@${handle}" saved!`);
  };

  return (
    <Card className="h-full bg-zinc-950/80 border-zinc-800">
      <CardHeader 
        title="Public Handle" 
        icon={UserCircle} 
        rightElement={<Badge variant="ghost">UNIQUE ID</Badge>}
      />
      
      <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
        Your VibePulse identity visible across session logs and synchronized frequency streams.
      </p>

      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          Username Handle
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AtSign className="w-4 h-4 text-zinc-500" />
          </div>
          <input 
            type="text" 
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-mono"
          />
        </div>
        <p className="text-[11px] text-zinc-500 font-mono">Alphanumeric and underscores only</p>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSave}
          className="bg-white hover:bg-zinc-200 text-black text-xs font-mono uppercase tracking-wider font-semibold py-2.5 px-5 rounded-full transition-colors"
        >
          Save Handle
        </button>
      </div>
    </Card>
  );
};

