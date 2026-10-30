import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  // Start with curated joyful tracks so player is active immediately on load
  const [songs, setSongs] = useState();

  const addUploadedSong = (newSong) => {
    setSongs((prev) => [newSong, ...(prev || [])]);
  };

  return (
    <SongContext.Provider value={{ songs, setSongs, addUploadedSong }}>
      {children}
    </SongContext.Provider>
  );
};
