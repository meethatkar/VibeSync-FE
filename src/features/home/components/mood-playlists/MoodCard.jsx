import React from "react";
import { Play } from "lucide-react";

const MoodCard = ({
  title,
  tracks,
  genre,
  duration,
  badgeText,
  icon: Icon,
  imageSrc,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-zinc-950/80 border border-zinc-800 hover:border-white rounded-xl p-4 flex flex-col gap-4 w-full cursor-pointer transition-all duration-200 font-sans"
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          Icon && (
            <Icon className="w-14 h-14 text-zinc-400 group-hover:text-white transition-colors" />
          )
        )}

        {/* Minimalist Monochrome Badge */}
        {badgeText && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/80 text-white border border-zinc-800 backdrop-blur-sm">
            {badgeText}
          </div>
        )}

        {/* Hover Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-white text-base font-bold truncate group-hover:underline decoration-zinc-500">
          {title}
        </h3>
        <p className="text-zinc-400 text-xs truncate">
          {tracks} Tracks • {genre}
        </p>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-900">
        <span className="uppercase tracking-wider">Duration</span>
        <span className="text-white font-semibold">{duration}</span>
      </div>
    </div>
  );
};

export default MoodCard;
