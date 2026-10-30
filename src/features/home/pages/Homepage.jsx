import React, { useCallback, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import MusicPlayer from "../components/MusicPlayer";
import SongList from "../components/SongList";
// NOTE: GradientWaves (WebGL shader) is commented out to adhere to strict minimalist black & white design requirements without gradients.
// import GradientWaves from "../components/GradientWaves";
import Hero from "../components/hero/Hero";
import MoodPlaylists from "../components/mood-playlists/MoodPlaylists";
import "../styles/Homepage.scss";

const HomePage = () => {
  const [currentEmotion, setCurrentEmotion] = useState("happy");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const lastFetchedMoodRef = useRef("");
  const fetchingMoodRef = useRef(false);

  const { fetchSongByMood, songs } = useSong();

  const handleEmotionChange = useCallback(
    async (detectedEmotion) => {
      if (!detectedEmotion || detectedEmotion.startsWith("Click on")) return;

      const normalized = detectedEmotion.toLowerCase().trim();
      setCurrentEmotion(normalized);

      // Prevent duplicate API requests for the same mood or while an API call is in-flight
      if (
        lastFetchedMoodRef.current === normalized ||
        fetchingMoodRef.current
      ) {
        return;
      }

      lastFetchedMoodRef.current = normalized;
      fetchingMoodRef.current = true;
      try {
        console.log("Fetching audio for mood:", normalized);
        await fetchSongByMood(normalized);
        setCurrentSongIndex(0); // Reset to first song when mood changes
      } catch (err) {
        console.error("Error fetching song by mood:", err);
      } finally {
        fetchingMoodRef.current = false;
      }
    },
    [fetchSongByMood],
  );

  const handleNextSong = () => {
    if (songs && currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prev) => prev + 1);
    }
  };

  const handlePrevSong = () => {
    if (songs && currentSongIndex > 0) {
      setCurrentSongIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="homepage-container relative bg-black text-white selection:bg-white selection:text-black">
      {/* Precision Monochrome Technical Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full flex flex-col">
        <Hero
          onEmotionChange={handleEmotionChange}
          currentEmotion={currentEmotion}
          currentSongName={
            songs?.[currentSongIndex]?.title || songs?.[currentSongIndex]?.name
          }
        />

        <div className="border-t border-zinc-900 w-full my-4"></div>

        <MoodPlaylists 
          activeEmotion={currentEmotion}
          onMoodSelect={handleEmotionChange} 
        />

        {/* Spacer for fixed music player to prevent hiding content */}
        <div className="h-28 sm:h-36 w-full flex-shrink-0 pointer-events-none"></div>

        {/* Playlist Popup */}
        <div
          className={`fixed z-[90] right-4 lg:right-12 bottom-[100px] w-80 lg:w-96 max-h-[60vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-2xl transition-all duration-300 transform ${
            isPlaylistOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <SongList
            songs={songs}
            currentSongIndex={currentSongIndex}
            onSelectSong={(index) => {
              setCurrentSongIndex(index);
              setIsPlaylistOpen(false);
            }}
          />
        </div>

        {/* Fixed Bottom Player */}
        <MusicPlayer
          song={songs?.[currentSongIndex]}
          onNext={
            songs && currentSongIndex < songs.length - 1 ? handleNextSong : null
          }
          onPrev={songs && currentSongIndex > 0 ? handlePrevSong : null}
          onTogglePlaylist={() => setIsPlaylistOpen(!isPlaylistOpen)}
        />
      </div>
    </div>
  );
};

export default HomePage;

