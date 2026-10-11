import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api";

export const CREATE_ORDER_KEY = ["createOrder"] as const;

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CREATE_ORDER_KEY,
    mutationFn: createOrder,
    // Seats left changed for everyone, so session lists are stale now.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  });
}
