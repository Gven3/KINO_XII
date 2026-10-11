import { useQuery } from "@tanstack/react-query";
import { getSessionDetails } from "../api";

export function useSessionDetails(id: number) {
  return useQuery({
    queryKey: ["session", id],
    queryFn: ({ signal }) => getSessionDetails(id, signal),
  });
}
