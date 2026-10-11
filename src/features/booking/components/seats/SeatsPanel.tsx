import { Link } from "react-router";
import type { TicketType } from "@/features/filter-options/types";
import type { SelectedSeat } from "../../types";
import { BookingButton } from "../ui/BookingButton";
import { BookingNotice } from "../ui/BookingNotice";
import { Subtotal } from "../ui/Subtotal";
import { SelectedSeatCard } from "./SelectedSeatCard";

type SeatsPanelProps = {
  selection: SelectedSeat[];
  ticketTypes: TicketType[];
  maxSeats: number;
  subtotal: number;
  blockReason: string | null;
  needsProfile: boolean;
  canContinue: boolean;
  isHolding: boolean;
  getPrice: (ticketType: string) => number;
  onTicketTypeChange: (seatId: number, ticketType: string) => void;
  onRemove: (seatId: number) => void;
  onNext: () => void;
};

export function SeatsPanel({
  selection,
  ticketTypes,
  maxSeats,
  subtotal,
  blockReason,
  needsProfile,
  canContinue,
  isHolding,
  getPrice,
  onTicketTypeChange,
  onRemove,
  onNext,
}: SeatsPanelProps) {
  return (
    <>
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <h3 className="text-h3 text-white">Your seats · Max {maxSeats}</h3>
        {selection.length === 0 ? (
          <p className="text-muted text-body-m">
            Pick up to {maxSeats} seats from the map. Each seat can carry its
            own ticket type.
          </p>
        ) : (
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col gap-3">
            {selection.map((seat) => (
              <SelectedSeatCard
                key={seat.seatId}
                seat={seat}
                price={getPrice(seat.ticketType)}
                ticketTypes={ticketTypes}
                onTicketTypeChange={(ticketType) =>
                  onTicketTypeChange(seat.seatId, ticketType)
                }
                onRemove={() => onRemove(seat.seatId)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 flex flex-col gap-4">
        {blockReason && <BookingNotice message={blockReason} />}
        {needsProfile && (
          <Link
            to="/profile"
            className="text-center text-primary text-button hover:underline"
          >
            Complete your profile
          </Link>
        )}
        <Subtotal amount={subtotal} />
        <BookingButton disabled={!canContinue} onClick={onNext}>
          {isHolding ? "Holding seats..." : "Next: Checkout"}
        </BookingButton>
      </div>
    </>
  );
}
