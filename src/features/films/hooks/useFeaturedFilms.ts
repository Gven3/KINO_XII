import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFeaturedFilms } from "../api";

export function useFeaturedFilms() {
  return useQuery({
    queryKey: ["films", "featured"],
    queryFn: ({ signal }) => getFeaturedFilms(signal),
    placeholderData: keepPreviousData,
  });
}
