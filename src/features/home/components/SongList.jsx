import React from "react";
import SongItem from "./SongItem";
import { ListMusic } from "lucide-react";

const SongList = ({ songs, currentSongIndex, onSelectSong }) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="p-6 text-center space-y-2 font-sans">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400">Audio Queue</h3>
        <p className="text-xs text-zinc-500">No tracks matched for current frequency.</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-2 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-white uppercase tracking-widest">
          <ListMusic size={14} className="text-white" />
          <span>Active Session Queue</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
          {songs.length} Tracks
        </span>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto max-h-[50vh] pr-1">
        {songs.map((song, index) => (
          <SongItem 
            key={song._id || index}
            song={song}
            isActive={index === currentSongIndex}
            onClick={() => onSelectSong(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;

