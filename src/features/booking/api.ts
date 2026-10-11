import { apiRequest } from "@/lib/apiClient";
import type { CheckoutValues } from "./schemas";
import type { Order, SeatHold, SeatMap, SessionDetails } from "./types";

export async function getSessionDetails(id: number, signal?: AbortSignal) {
  const response = await apiRequest<{ data: SessionDetails }>(
    `/sessions/${id}`,
    { signal },
  );
  return response.data;
}

export async function getSeatMap(sessionId: number, signal?: AbortSignal) {
  const response = await apiRequest<{ data: SeatMap }>(
    `/sessions/${sessionId}/seats`,
    { signal },
  );
  return response.data;
}

type CreateHoldValues = {
  sessionId: number;
  seats: { seatId: number; ticketType: string }[];
};

export async function createHold({ sessionId, seats }: CreateHoldValues) {
  const response = await apiRequest<{ data: SeatHold }>(
    `/sessions/${sessionId}/holds`,
    { method: "POST", body: { seats } },
  );
  return response.data;
}

export async function getHold(holdId: string, signal?: AbortSignal) {
  const response = await apiRequest<{ data: SeatHold }>(`/holds/${holdId}`, {
    signal,
  });
  return response.data;
}

export function releaseHold(holdId: string) {
  return apiRequest<void>(`/holds/${holdId}`, { method: "DELETE" });
}

export async function createOrder(values: CheckoutValues & { holdId: string }) {
  const response = await apiRequest<{ data: Order }>("/orders", {
    method: "POST",
    body: values,
  });
  return response.data;
}
