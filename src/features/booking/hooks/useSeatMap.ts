import { useQuery } from "@tanstack/react-query";
import { getSeatMap } from "../api";

export function useSeatMap(sessionId: number) {
  return useQuery({
    queryKey: ["seats", sessionId],
    queryFn: ({ signal }) => getSeatMap(sessionId, signal),
    staleTime: 0,
  });
}
