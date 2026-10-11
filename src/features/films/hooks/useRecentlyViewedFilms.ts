import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { ApiError } from "@/lib/apiClient";
import { getFilmBySlug } from "../api";
import { recentlyViewed } from "../recentlyViewed";

const isNotFound = (error: Error | null) =>
  error instanceof ApiError && error.status === 404;

export function useRecentlyViewedFilms() {
  const [slugs] = useState(recentlyViewed.get);

  // Same query key as the movie page, so films seen this visit are cached.
  return useQueries({
    queries: slugs.map((slug) => ({
      queryKey: ["films", slug],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        getFilmBySlug(slug, signal),
      // A removed film will not come back, so do not keep asking for it.
      retry: (count: number, error: Error) => !isNotFound(error) && count < 3,
    })),
    combine: (results) => ({
      // Keep the viewing order; a film that no longer exists is left out.
      films: results.flatMap((result) => (result.data ? [result.data] : [])),
      isLoading: results.some((result) => result.isPending),
      isError: results.some(
        (result) => result.isError && !isNotFound(result.error),
      ),
      isRetrying: results.some((result) => result.isRefetching),
      refetch: () =>
        results.forEach((result) => {
          if (result.isError) result.refetch();
        }),
      skeletonCount: Math.min(slugs.length, 4),
    }),
  });
}
