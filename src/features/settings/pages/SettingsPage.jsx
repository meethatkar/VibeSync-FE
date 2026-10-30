import React from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SettingsProfileCard } from "../components/SettingsProfileCard";
import { SettingsPublicHandleCard } from "../components/SettingsPublicHandleCard";
import { SettingsPasswordCard } from "../components/SettingsPasswordCard";
import { SettingsDangerZone } from "../components/SettingsDangerZone";
import { Button } from "../../../components/ui/button";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-12 font-sans selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header Section */}
        <div className="space-y-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full text-xs font-mono uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Terminal
          </Button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase flex items-center gap-2">
                VibePulse ID <span className="text-zinc-700">//</span> Node Security
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
                Account & Security
              </h1>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-3.5 py-1.5">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs font-mono text-zinc-300">Encrypted Client Session</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <SettingsProfileCard />

        {/* Main Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <SettingsPublicHandleCard />
          </div>
          <div className="lg:col-span-7">
            <SettingsPasswordCard />
          </div>
        </div>

        {/* Danger Zone */}
        <SettingsDangerZone />

      </div>
    </div>
  );
};

export default SettingsPage;

