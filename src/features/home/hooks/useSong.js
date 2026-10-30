import { useContext } from "react";
import { getSongByMood } from "../services/song.service";
import { SongContext } from "../song.context";

export const useSong = () => {
  const { songs, setSongs, addUploadedSong } = useContext(SongContext);

  const fetchSongByMood = async (mood, page = 1, limit = 10) => {
    const normalizedMood = mood.toLowerCase().trim();

    try {
      const response = await getSongByMood(normalizedMood, page, limit);

      if (
        response.data &&
        response.data.songs &&
        response.data.songs.length > 0
      ) {
        setSongs(response.data.songs);
        return response.data.songs;
      }
    } catch (err) {
      console.warn(
        "Backend song fetch bypassed, using curated local audio:",
        err.message,
      );
    }

    return [];
  };

  return { fetchSongByMood, songs, addUploadedSong };
};
