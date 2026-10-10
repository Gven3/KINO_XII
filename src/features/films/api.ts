import { apiRequest } from "@/lib/apiClient";
import type { Film } from "@/features/films/types";

type FilmsResponse = {
  data: Film[];
};

export async function getFeaturedFilms(signal?: AbortSignal) {
  const response = await apiRequest<FilmsResponse>("/movies/featured", {
    signal,
  });
  return response.data;
}

export async function getNowPlayingFilms(limit?: number, signal?: AbortSignal) {
  const response = await apiRequest<FilmsResponse>("/movies/now-playing", {
    params: limit !== undefined ? { limit: String(limit) } : undefined,
    signal,
  });
  return response.data;
}
