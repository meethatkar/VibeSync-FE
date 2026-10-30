import api from "../../../utils/apiClient";

export const getSongByMood = async (mood, page = 1, limit = 10) => {
  return await api.get(`/song/?mood=${mood}&page=${page}&limit=${limit}`);
};
