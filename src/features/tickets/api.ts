import { apiRequest } from "@/lib/apiClient";
import type { Order } from "@/features/booking/types";

export async function getTickets(signal?: AbortSignal) {
  const response = await apiRequest<{ data: Order[] }>("/tickets", { signal });
  return response.data;
}

export async function refundOrder(reference: string) {
  const response = await apiRequest<{ data: Order }>(
    `/orders/${reference}/refund`,
    { method: "POST" },
  );
  return response.data;
}
