import React from "react";
import { Play } from "lucide-react";

const formatDuration = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SongItem = ({ song, isActive, onClick }) => {
  return (
    <div 
      className={`group flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer font-sans ${
        isActive 
          ? "bg-zinc-900 border-l-2 border-l-white border-zinc-700 text-white" 
          : "bg-transparent border-transparent hover:bg-zinc-900/60 hover:border-zinc-800 text-zinc-300"
      }`} 
      onClick={onClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-10 h-10 rounded overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
          <img 
            src={song.posterUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=80&h=80&q=80"} 
            alt={song.title} 
            className="w-full h-full object-cover filter grayscale" 
          />
          {isActive && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-white text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="text-sm font-semibold truncate text-white" title={song.title}>
            {song.title}
          </h4>
          <p className="text-xs text-zinc-500 truncate font-mono" title={song.artist}>
            {song.artist || "Unknown Artist"}
          </p>
        </div>
      </div>
      <div className="text-xs text-zinc-500 font-mono ml-3 shrink-0">
        {formatDuration(song.songDuration || song.duration)}
      </div>
    </div>
  );
};

export default SongItem;

