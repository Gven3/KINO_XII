import { useEffect, useEffectEvent, useState } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";
import { holdStorage } from "../holdStorage";
import type {
  BookingStep,
  Order,
  Seat,
  SeatHold,
  SelectedSeat,
  SessionDetails,
} from "../types";
import {
  getAllowedTicketTypes,
  getBookingError,
  getSeatPrice,
  matchesHold,
  roundPrice,
} from "../utils";
import { useCreateHold } from "./useCreateHold";
import { useSeatMap } from "./useSeatMap";

export const HOLD_EXPIRED_MESSAGE =
  "Your hold time expired. Please re-select your seats.";
const DEFAULT_TICKET_TYPE = "adult";

function toSelection(hold: SeatHold | null): SelectedSeat[] {
  return (
    hold?.seats.map((seat) => ({
      seatId: seat.seatId,
      code: seat.code,
      ticketType: seat.ticketType.slug,
    })) ?? []
  );
}

export function useBooking(
  session: SessionDetails,
  initialHold: SeatHold | null,
) {
  const { user } = useCurrentUser();
  const { data: options } = useFilterOptions();
  const { data: seatMap, refetch: refetchSeats } = useSeatMap(session.id);
  const { mutateAsync: createHold, isPending: isHolding } = useCreateHold();

  const [step, setStep] = useState<BookingStep>(
    initialHold ? "checkout" : "seats",
  );
  const [selection, setSelection] = useState(() => toSelection(initialHold));
  const [hold, setHold] = useState(initialHold);
  const [order, setOrder] = useState<Order | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [takenCodes, setTakenCodes] = useState<string[]>([]);

  const allTicketTypes = options?.ticketTypes ?? [];
  const maxSeats = options?.maxSeatsPerOrder ?? 0;
  const { minAge, code: ratingCode } = session.movie.ageRating;
  const ticketTypes = getAllowedTicketTypes(allTicketTypes, minAge);

  const getPrice = (ticketType: string) =>
    getSeatPrice(session.price, allTicketTypes, ticketType);
  const subtotal = roundPrice(
    selection.reduce((sum, seat) => sum + getPrice(seat.ticketType), 0),
  );

  const isUnderAge = user?.age != null && user.age < minAge;
  const blockReason = !user?.profileComplete
    ? "Complete your profile to book tickets."
    : isUnderAge
      ? `This film is rated ${ratingCode}. You cannot buy tickets for it with this account.`
      : null;
  const canContinue = !blockReason && selection.length > 0 && !isHolding;

  async function refreshSeats() {
    await refetchSeats();
    setTakenCodes([]);
  }

  function toggleSeat(seat: Seat) {
    setNotice(null);
    if (selection.some((selected) => selected.seatId === seat.id)) {
      removeSeat(seat.id);
      return;
    }
    if (selection.length >= maxSeats) {
      setNotice(`You can select up to ${maxSeats} seats per order.`);
      return;
    }
    setSelection((prev) => [
      ...prev,
      { seatId: seat.id, code: seat.code, ticketType: DEFAULT_TICKET_TYPE },
    ]);
  }

  function removeSeat(seatId: number) {
    setSelection((prev) => prev.filter((seat) => seat.seatId !== seatId));
  }

  function changeTicketType(seatId: number, ticketType: string) {
    setSelection((prev) =>
      prev.map((seat) =>
        seat.seatId === seatId ? { ...seat, ticketType } : seat,
      ),
    );
  }

  // Someone else got these seats first: show them as sold, keep the rest.
  function loseSeats(codes: string[]) {
    setSelection((prev) => prev.filter((seat) => !codes.includes(seat.code)));
    setTakenCodes(codes);
    setNotice(
      `Seat ${codes.join(", ")} ${codes.length === 1 ? "was" : "were"} just taken by someone else. Your other seats are still selected.`,
    );
    setStep("seats");
    refreshSeats();
  }

  function expireHold() {
    holdStorage.clear(session.id);
    setHold(null);
    setSelection([]);
    setNotice(HOLD_EXPIRED_MESSAGE);
    setStep("seats");
    refreshSeats();
  }

  const onHoldExpired = useEffectEvent(expireHold);

  // Timed from expiresAt, so a slow render or a background tab does not drift.
  useEffect(() => {
    if (!hold) return;
    const timeout = setTimeout(
      onHoldExpired,
      Date.parse(hold.expiresAt) - Date.now(),
    );
    return () => clearTimeout(timeout);
  }, [hold]);

  async function holdSeats() {
    // Nothing changed since the hold was made: keep it and its countdown.
    // A new hold request would replace it with a fresh one.
    if (hold && matchesHold(selection, hold)) {
      setNotice(null);
      setStep("checkout");
      return;
    }

    try {
      const newHold = await createHold({
        sessionId: session.id,
        seats: selection.map(({ seatId, ticketType }) => ({
          seatId,
          ticketType,
        })),
      });
      holdStorage.set(session.id, newHold.holdId);
      setHold(newHold);
      setNotice(null);
      setStep("checkout");
    } catch (error) {
      const { status, contested, message } = getBookingError(error);
      if (status === 409) loseSeats(contested);
      else setNotice(message);
    }
  }

  // Back to seats keeps the hold: the user still wants those seats.
  function goToSeats() {
    setNotice(null);
    setStep("seats");
  }

  function completeOrder(newOrder: Order) {
    holdStorage.clear(session.id);
    setHold(null);
    setOrder(newOrder);
  }

  return {
    step,
    seatMap,
    selection,
    hold,
    order,
    notice,
    takenCodes,
    ticketTypes,
    maxSeats,
    subtotal,
    blockReason,
    canContinue,
    isHolding,
    getPrice,
    toggleSeat,
    removeSeat,
    changeTicketType,
    holdSeats,
    goToSeats,
    loseSeats,
    expireHold,
    completeOrder,
  };
}
