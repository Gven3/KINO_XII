import type { Seat, SeatMap, SelectedSeat } from "../../types";
import { getSeatDisplayState } from "../../utils";
import { HallSection } from "./HallSection";
import { SeatLegend } from "./SeatLegend";

type SeatMapViewProps = {
  seatMap: SeatMap | undefined;
  selection: SelectedSeat[];
  takenCodes: string[];
  onToggle: (seat: Seat) => void;
};

export function SeatMapView({
  seatMap,
  selection,
  takenCodes,
  onToggle,
}: SeatMapViewProps) {
  const getState = (seat: Seat) =>
    getSeatDisplayState(
      seat,
      selection.some((selected) => selected.seatId === seat.id),
      takenCodes.includes(seat.code),
    );

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-6">
      <div className="mx-6 h-10 shrink-0 rounded-b-3xl bg-surface-light flex items-center justify-center text-white text-label-m uppercase">
        Screen
      </div>
      <div className="flex-1 min-h-0 overflow-auto scrollbar-custom flex flex-col gap-8">
        {seatMap ? (
          seatMap.sections.map((section) => (
            <HallSection
              key={section.name}
              section={section}
              getState={getState}
              onToggle={onToggle}
            />
          ))
        ) : (
          <span className="text-muted text-body-m text-center">
            Loading seats...
          </span>
        )}
      </div>
      <SeatLegend />
    </div>
  );
}
