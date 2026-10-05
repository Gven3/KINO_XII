import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchFilms } from "../api";

export function useSearchFilms(query: string) {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ["search", trimmedQuery],
    queryFn: ({ signal }) => searchFilms(trimmedQuery, signal),
    select: (response) => response.data,
    enabled: trimmedQuery !== "",
    placeholderData: keepPreviousData,
  });
}
