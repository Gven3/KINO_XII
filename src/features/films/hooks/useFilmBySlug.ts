import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/lib/apiClient";
import { getFilmBySlug } from "../api";

export function useFilmBySlug(slug: string) {
  return useQuery({
    queryKey: ["films", slug],
    queryFn: ({ signal }) => getFilmBySlug(slug, signal),
    retry: (count, error) =>
      !(error instanceof ApiError && error.status === 404) && count < 3,
  });
}
