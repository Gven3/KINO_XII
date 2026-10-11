import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getFilmBySlug } from "../api";
import { recentlyViewed } from "../recentlyViewed";

export function useRecentlyViewedFilms() {
  const [slugs] = useState(recentlyViewed.get);

  // Same query key as the movie page, so films seen this visit are cached.
  return useQueries({
    queries: slugs.map((slug) => ({
      queryKey: ["films", slug],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        getFilmBySlug(slug, signal),
    })),
    // Keep the viewing order; a film that failed to load is left out.
    combine: (results) =>
      results.flatMap((result) => (result.data ? [result.data] : [])),
  });
}
