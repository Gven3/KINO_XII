import { apiRequest } from "@/lib/apiClient";
import type { FilterOptions } from "./types";

export async function getFilterOptions(signal?: AbortSignal) {
  const response = await apiRequest<{ data: FilterOptions }>(
    "/filter-options",
    { signal },
  );
  return response.data;
}
