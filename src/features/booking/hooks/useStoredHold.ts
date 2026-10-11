import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/lib/apiClient";
import { getHold } from "../api";
import { holdStorage } from "../holdStorage";

// Resumes a hold saved before a page reload. Resolves to null when there is
// none, it ran out (isLive: false) or it never existed (404).
export function useStoredHold(sessionId: number) {
  const [holdId] = useState(() => holdStorage.get(sessionId));

  return useQuery({
    queryKey: ["holds", holdId],
    queryFn: async ({ signal }) => {
      const hold = await getHold(holdId ?? "", signal).catch((error) => {
        if (error instanceof ApiError && error.status === 404) return null;
        throw error;
      });
      if (hold?.isLive) return hold;

      holdStorage.clear(sessionId);
      return null;
    },
    enabled: holdId !== null,
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
  });
}
