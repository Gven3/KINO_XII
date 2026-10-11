import { ApiError } from "@/lib/apiClient";
import type { TicketType } from "@/features/filter-options/types";
import type { Seat, SeatState } from "./types";

export type SeatDisplayState = SeatState | "selected";

export function getSeatDisplayState(
  seat: Seat,
  isSelected: boolean,
  isTaken: boolean,
): SeatDisplayState {
  if (isSelected) return "selected";
  if (isTaken) return "sold";
  // Our own live hold shows as free, so it can be selected again.
  if (seat.isMine) return "available";
  return seat.state;
}

// Child tickets are refused on titles rated at or above their blocked age.
export function getAllowedTicketTypes(
  ticketTypes: TicketType[],
  minAge: number,
) {
  return ticketTypes.filter(
    (type) =>
      type.blockedFromRatingAge === null || minAge < type.blockedFromRatingAge,
  );
}

export function roundPrice(price: number) {
  return Math.round(price * 100) / 100;
}

export function getSeatPrice(
  basePrice: number,
  ticketTypes: TicketType[],
  slug: string,
) {
  const ratio = ticketTypes.find((type) => type.slug === slug)?.priceRatio ?? 1;
  return roundPrice(basePrice * ratio);
}

// ["Adult", "Adult", "Child"] -> "2 x Adult, 1 x Child"
export function summarizeTickets(names: string[]) {
  const counts = new Map<string, number>();
  names.forEach((name) => counts.set(name, (counts.get(name) ?? 0) + 1));
  return [...counts].map(([name, count]) => `${count} x ${name}`).join(", ");
}

export function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

type BookingErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
  contested?: string[];
};

export function getBookingError(error: unknown) {
  const body =
    error instanceof ApiError ? (error.data as BookingErrorBody | null) : null;
  const firstFieldError = body?.errors && Object.values(body.errors)[0]?.[0];

  return {
    status: error instanceof ApiError ? error.status : null,
    hasFieldErrors: body?.errors !== undefined,
    contested: body?.contested ?? [],
    message:
      firstFieldError ?? body?.message ?? "Something went wrong. Try again.",
  };
}
