import { useQuery } from "@tanstack/react-query";
import { getFilmBySlug } from "../api";

export function useFilmBySlug(slug: string) {
  return useQuery({
    queryKey: ["films", slug],
    queryFn: ({ signal }) => getFilmBySlug(slug, signal),
  });
}
