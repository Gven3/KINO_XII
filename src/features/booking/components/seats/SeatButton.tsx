import type { Seat } from "../../types";
import type { SeatDisplayState } from "../../utils";
import { SEAT_STYLES } from "./seatStyles";

type SeatButtonProps = {
  seat: Seat;
  state: SeatDisplayState;
  onToggle: (seat: Seat) => void;
};

export function SeatButton({ seat, state, onToggle }: SeatButtonProps) {
  // No seat here (gangway, wheelchair space): keep the gap so the row lines up.
  if (state === "unavailable") return <span className="size-12 shrink-0" />;

  const isSelectable = state === "available" || state === "selected";

  return (
    <button
      type="button"
      disabled={!isSelectable}
      onClick={() => onToggle(seat)}
      aria-label={`Seat ${seat.code}`}
      aria-pressed={state === "selected"}
      className={`size-12 shrink-0 rounded-xl text-h3 transition-colors enabled:cursor-pointer enabled:hover:border-white disabled:cursor-not-allowed ${SEAT_STYLES[state]}`}
    >
      {seat.label}
    </button>
  );
}
