import { apiGet } from "@/lib/apiClient";
import type { Film } from "@/features/films/types";

type searchResponse = {
  data: Film[];
};

export function searchFilms(query: string, signal?: AbortSignal) {
  return apiGet<searchResponse>("/search", { q: query }, signal);
}
