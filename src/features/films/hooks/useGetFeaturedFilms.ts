import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFeaturedFilms } from "../api";

export function useGetFeaturedFilms() {
  return useQuery({
    queryKey: ["films", "featured"],
    queryFn: ({ signal }) => getFeaturedFilms(signal),
    select: (response) => response.data,
    placeholderData: keepPreviousData,
  });
}
