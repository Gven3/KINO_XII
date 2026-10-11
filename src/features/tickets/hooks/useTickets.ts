import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../api";

export const TICKETS_KEY = ["tickets"] as const;

// One request for both tabs: orders are split on isUpcoming.
export function useTickets() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: TICKETS_KEY,
    queryFn: ({ signal }) => getTickets(signal),
  });

  return {
    upcoming: orders.filter((order) => order.isUpcoming),
    past: orders.filter((order) => !order.isUpcoming),
    isLoading,
  };
}
