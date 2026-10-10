import { useQuery } from "@tanstack/react-query";
import { getNowPlayingFilms } from "../api";

export function useNowPlayingFilms(limit?: number) {
  return useQuery({
    queryKey: ["films", "now-playing", limit],
    queryFn: ({ signal }) => getNowPlayingFilms(limit, signal),
  });
}
