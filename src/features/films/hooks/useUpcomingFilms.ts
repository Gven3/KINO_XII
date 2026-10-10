import { useQuery } from "@tanstack/react-query";
import { getUpcomingFilms } from "../api";

export function useUpcomingFilms(limit?: number) {
  return useQuery({
    queryKey: ["films", "coming-soon", limit],
    queryFn: ({ signal }) => getUpcomingFilms(limit, signal),
  });
}
