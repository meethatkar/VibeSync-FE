import React from "react";
import { Badge, Card } from "./SettingsUI";
import { ShieldCheck, Calendar, Headphones } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { useAuth } from "../../auth/hooks/useAuth";

export const SettingsProfileCard = () => {
  const { user } = useAuth();

  const userInitials = (user?.username || "Guest")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-zinc-950/80 border-zinc-800">
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="w-16 h-16 border border-zinc-700 bg-zinc-900">
            <AvatarFallback className="text-white font-mono font-bold text-lg bg-zinc-900">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-black p-1 rounded-full border border-zinc-700 text-white">
            <Headphones className="w-3 h-3" />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white font-heading">
              {user?.username || "Guest Reviewer"}
            </h2>
            <Badge variant="default" className="py-0.5 px-2.5 text-[10px]">
              {user?.isGuest ? "GUEST AUDITOR" : "VERIFIED ID"}
            </Badge>
          </div>
          <p className="text-zinc-400 text-xs font-mono">
            {user?.email || "demo@vibepulse.ai"}
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500 pt-1 font-mono">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>Session: Active</span>
            </div>
            <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
            <span className="text-white">Lossless Stems</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start md:items-end gap-2">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Security Integrity
        </span>
        <Badge variant="emerald" className="py-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Biometric Mesh Local
        </Badge>
      </div>
    </Card>
  );
};

