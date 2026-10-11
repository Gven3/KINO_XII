import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Order } from "@/features/booking/types";
import { refundOrder } from "../api";
import { TICKETS_KEY } from "./useTickets";

export function useRefundOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refundOrder,
    onSuccess: (refunded) => {
      // Re-render from the stored order: it is no longer upcoming, so it moves to Past.
      queryClient.setQueryData<Order[]>(TICKETS_KEY, (orders) =>
        orders?.map((order) => (order.id === refunded.id ? refunded : order)),
      );
      // The seats are back on the map.
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["seats"] });
    },
  });
}
