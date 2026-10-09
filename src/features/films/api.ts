import { apiRequest } from "@/lib/apiClient";
import type { Film } from "@/features/films/types";

type FeaturedFilmsResponse = {
  data: Film[];
};

export function getFeaturedFilms(signal?: AbortSignal) {
  return apiRequest<FeaturedFilmsResponse>("/movies/featured", { signal });
}
