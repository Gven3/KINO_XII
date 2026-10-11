import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { filterOptionsQuery } from "@/features/filter-options/hooks/useFilterOptions";

const queryClient = new QueryClient({});
queryClient.prefetchQuery(filterOptionsQuery);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
