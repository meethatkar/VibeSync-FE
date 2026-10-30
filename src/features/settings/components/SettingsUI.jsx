import React from "react";
import { cn } from "../../../lib/utils";

export const Card = ({ children, className }) => (
  <div className={cn("bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 font-sans", className)}>
    {children}
  </div>
);

export const CardHeader = ({ title, icon: Icon, rightElement, subText, iconClass = "text-white" }) => (
  <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
    <div className="flex items-center gap-2.5">
      {Icon && <Icon className={cn("w-5 h-5", iconClass)} />}
      <h3 className="text-lg font-bold text-white font-heading">{title}</h3>
    </div>
    {rightElement && <div>{rightElement}</div>}
  </div>
);

export const Badge = ({ children, variant = "default", className }) => {
  const variants = {
    default: "bg-zinc-900 text-zinc-300 border border-zinc-800",
    cyan: "bg-white text-black font-semibold",
    emerald: "bg-zinc-900 text-white border border-zinc-700",
    danger: "bg-zinc-900 text-zinc-300 border border-zinc-800",
    ghost: "text-zinc-500 uppercase tracking-widest font-mono text-[10px]",
  };
  return (
    <span className={cn("px-2.5 py-1 text-xs font-mono font-medium rounded-full flex items-center gap-1.5 w-max", variants[variant], className)}>
      {children}
    </span>
  );
};

