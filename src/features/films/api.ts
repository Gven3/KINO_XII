import { apiRequest } from "@/lib/apiClient";
import type { Film, FilmDetails } from "@/features/films/types";

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

export async function getUpcomingFilms(limit?: number, signal?: AbortSignal) {
  const response = await apiRequest<FilmsResponse>("/movies/coming-soon", {
    params: limit !== undefined ? { limit: String(limit) } : undefined,
    signal,
  });
  return response.data;
}

export function notifyMe(slug: string) {
  return apiRequest<void>(`/movies/${slug}/notify`, { method: "POST" });
}

export async function getFilmBySlug(slug: string, signal?: AbortSignal) {
  const response = await apiRequest<{ data: FilmDetails }>(`/movies/${slug}`, {
    signal,
  });
  return response.data;
}
