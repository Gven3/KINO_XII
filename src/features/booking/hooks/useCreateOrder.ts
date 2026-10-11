import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api";

export const CREATE_ORDER_KEY = ["createOrder"] as const;

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CREATE_ORDER_KEY,
    mutationFn: createOrder,
    onSuccess: () => {
      // Seats left changed for everyone, so session lists are stale now.
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      // The new order belongs in My Tickets.
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}
