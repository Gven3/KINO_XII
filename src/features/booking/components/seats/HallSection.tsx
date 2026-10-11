import { Fragment } from "react";
import type { Seat, SeatSection } from "../../types";
import type { SeatDisplayState } from "../../utils";
import { SeatButton } from "./SeatButton";

type HallSectionProps = {
  section: SeatSection;
  getState: (seat: Seat) => SeatDisplayState;
  onToggle: (seat: Seat) => void;
};

export function HallSection({ section, getState, onToggle }: HallSectionProps) {
  const first = section.rows[0]?.label;
  const last = section.rows[section.rows.length - 1]?.label;
  const rows = first === last ? `Row ${first}` : `Rows ${first}-${last}`;

  return (
    <div className="w-max mx-auto flex flex-col gap-4">
      <span className="text-muted text-label-m uppercase">
        {section.name} · {rows}
      </span>
      <div className="flex flex-col gap-2">
        {section.rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-6 shrink-0 text-white text-label-m">
              {row.label}
            </span>
            {row.seats.map((seat) => (
              <Fragment key={seat.id}>
                <SeatButton
                  seat={seat}
                  state={getState(seat)}
                  onToggle={onToggle}
                />
                {seat.aisleAfter && <span className="w-6 shrink-0" />}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
