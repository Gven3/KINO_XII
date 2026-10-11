import { apiRequest } from "@/lib/apiClient";
import type { MovieSessions, SessionsMeta, VenueSessions } from "./types";

export async function getFilmSessions(
  slug: string,
  date: string,
  signal?: AbortSignal,
) {
  const response = await apiRequest<{ data: VenueSessions[] }>(
    `/movies/${slug}/sessions`,
    { params: { date: date }, signal },
  );
  return response.data;
}

export function getSessions(params: URLSearchParams, signal?: AbortSignal) {
  return apiRequest<{ data: MovieSessions[]; meta: SessionsMeta }>(
    "/sessions",
    { params, signal },
  );
}
