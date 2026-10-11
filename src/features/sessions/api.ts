import { apiRequest } from "@/lib/apiClient";
import type { VenueSessions } from "./types";

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
