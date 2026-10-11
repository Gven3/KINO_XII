import type { SeatDisplayState } from "../../utils";
import { SEAT_STYLES } from "./seatStyles";

const LEGEND: { state: SeatDisplayState; label: string }[] = [
  { state: "available", label: "Available" },
  { state: "selected", label: "Selected" },
  { state: "sold", label: "Sold" },
  { state: "held", label: "Held by another user" },
];

export function SeatLegend() {
  return (
    <div className="flex items-center justify-center gap-7">
      {LEGEND.map(({ state, label }) => (
        <span key={state} className="flex items-center gap-2">
          <span className={`size-5 rounded-md ${SEAT_STYLES[state]}`} />
          <span className="text-muted text-body-m">{label}</span>
        </span>
      ))}
    </div>
  );
}
