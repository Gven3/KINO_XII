import { queryOptions, useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "../api";

export const filterOptionsQuery = queryOptions({
  queryKey: ["filterOptions"],
  queryFn: ({ signal }) => getFilterOptions(signal),
  staleTime: Infinity,
  gcTime: Infinity,
});

export function useFilterOptions() {
  return useQuery(filterOptionsQuery);
}
