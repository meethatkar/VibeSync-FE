import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2, ListMusic, AudioLines, Radio } from "lucide-react";
import { Button } from "../../../components/ui/button";

const MusicPlayer = ({ song, onNext, onPrev, onTogglePlaylist }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Auto-play when a new song is loaded
  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Auto-play waiting for user interaction:", err.message);
        setIsPlaying(false);
      });
    }
  }, [song]);

  const togglePlay = () => {
    if (!song || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percent = Math.max(0, Math.min(1, clickPosition / progressBar.offsetWidth));
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onNext) onNext();
  };

  if (!song) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 font-sans">
      {/* Container */}
      <div className="w-full max-w-[1900px] mx-auto bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 shadow-2xl rounded-2xl overflow-hidden relative flex flex-col pt-[3px]">
        
        {/* Minimalist Monochrome Scrub Bar */}
        <div 
          className="absolute top-0 left-0 w-full h-[3px] bg-zinc-900 cursor-pointer group hover:h-[6px] transition-all z-10"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-white relative transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
          
          {/* Left: Song Info */}
          <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-zinc-800 bg-black shadow-md">
              <img 
                src={song.posterUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80"} 
                alt={song.title} 
                className="w-full h-full object-cover filter grayscale contrast-125" 
              />
            </div>
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold truncate text-sm sm:text-base">{song.title}</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 uppercase border border-zinc-700 shrink-0">
                  HI-RES
                </span>
              </div>
              <span className="text-zinc-400 text-xs truncate mt-0.5 font-mono">
                {song.artist || "Unknown Artist"} • {song.mood || "Dynamic"} Vibe
              </span>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="text-zinc-500 hover:text-white transition-colors ml-1 hidden sm:block"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : ""}`} />
            </button>
          </div>

          {/* Middle: Controls */}
          <div className="flex flex-col items-center justify-center w-1/3 gap-1.5">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-8 w-8 hidden sm:flex"
              >
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-8 w-8 disabled:opacity-30" 
                onClick={onPrev} 
                disabled={!onPrev}
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </Button>
              
              <Button 
                variant="default"
                size="icon"
                className="w-10 h-10 rounded-full bg-white hover:bg-zinc-200 text-black shadow-lg hover:scale-105 transition-transform shrink-0" 
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-8 w-8 disabled:opacity-30" 
                onClick={onNext} 
                disabled={!onNext}
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-8 w-8 hidden sm:flex"
              >
                <Repeat className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Time / Audio Waveform Indicator */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-400 font-mono">
              <AudioLines className={`w-3.5 h-3.5 text-white ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
              <span>{formatTime(currentTime)} / {formatTime(duration || song.songDuration || 0)}</span>
            </div>
          </div>

          {/* Right: Extras */}
          <div className="flex items-center justify-end gap-3 sm:gap-6 w-1/3">
            <div className="hidden lg:flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] tracking-wider uppercase border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 rounded-full">
              <Radio className="w-3 h-3 text-white" />
              <span>Binaural Sync</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-zinc-400" />
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 lg:w-20 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white hover:accent-zinc-300"
              />
            </div>
            
            <button 
              className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-900 rounded-lg"
              onClick={onTogglePlaylist}
              title="Toggle Playlist"
            >
              <ListMusic className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.songUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
};

export default MusicPlayer;

