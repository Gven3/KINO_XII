import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSessions } from "../api";

export function useSessions(params: URLSearchParams) {
  return useQuery({
    queryKey: ["sessions", params.toString()],
    queryFn: ({ signal }) => getSessions(params, signal),
    placeholderData: keepPreviousData,
  });
}
