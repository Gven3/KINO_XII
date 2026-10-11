import { useQuery } from "@tanstack/react-query";
import { getFilmSessions } from "../api";

export function useFilmSessions(slug: string, date: string) {
  return useQuery({
    queryKey: ["sessions", slug, date],
    queryFn: ({ signal }) => getFilmSessions(slug, date, signal),
  });
}
