import React from "react";
import { Card } from "./SettingsUI";
import { AlertCircle, Trash2 } from "lucide-react";
import { showSuccessToast } from "../../../utils/toast";

export const SettingsDangerZone = () => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to erase this session data?")) {
      showSuccessToast("Demo session data reset.");
    }
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950/80">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-400 mb-1">
            <AlertCircle className="w-4 h-4 text-white" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
              Terminal Decommissioning
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-heading">Permanent Node Erasure</h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Account termination is immediate. Executing this will purge local biometric blend shape cache, custom listening queues, and session authentication keys.
          </p>
        </div>
        
        <button 
          onClick={handleDelete}
          className="shrink-0 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider py-2.5 px-5 rounded-full transition-colors border border-zinc-700 hover:border-white"
        >
          <Trash2 className="w-4 h-4" /> Reset Node Session
        </button>
      </div>
    </Card>
  );
};

