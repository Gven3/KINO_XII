import { useRef, type MouseEvent } from "react";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { ErrorState } from "@/components/ui/ErrorState";
import type { Seat, SeatMap, SelectedSeat } from "../../types";
import { getSeatDisplayState } from "../../utils";
import { HallSection } from "./HallSection";
import { SeatLegend } from "./SeatLegend";
import { ZoomControls } from "./ZoomControls";

// A press that moved further than this was a drag, not a seat click.
const DRAG_THRESHOLD = 5;

type SeatMapViewProps = {
  seatMap: SeatMap | undefined;
  isError: boolean;
  isRetrying: boolean;
  onRetry: () => void;
  selection: SelectedSeat[];
  takenCodes: string[];
  onToggle: (seat: Seat) => void;
};

export function SeatMapView({
  seatMap,
  isError,
  isRetrying,
  onRetry,
  selection,
  takenCodes,
  onToggle,
}: SeatMapViewProps) {
  const dragStart = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);

  const getState = (seat: Seat) =>
    getSeatDisplayState(
      seat,
      selection.some((selected) => selected.seatId === seat.id),
      takenCodes.includes(seat.code),
    );

  const handlePanningStart = ({ state }: ReactZoomPanPinchRef) => {
    wasDragged.current = false;
    dragStart.current = { x: state.positionX, y: state.positionY };
  };

  const handlePanningStop = ({ state }: ReactZoomPanPinchRef) => {
    const moved = Math.hypot(
      state.positionX - dragStart.current.x,
      state.positionY - dragStart.current.y,
    );
    wasDragged.current = moved > DRAG_THRESHOLD;
  };

  // Letting go after dragging the map must not select the seat under the cursor.
  const handleClickCapture = (event: MouseEvent) => {
    if (!wasDragged.current) return;
    wasDragged.current = false;
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-6">
      {seatMap ? (
        <TransformWrapper
          fitOnInit="contain"
          // 0.5 is just below the fit of the biggest hall (D), so zooming
          // out stops around "whole hall" instead of shrinking it to a dot.
          minScale={0.5}
          maxScale={2.5}
          // Scale changes by step × wheel delta per event; touchpad pinch
          // fires many small events, so keep the step small.
          wheel={{ step: 0.004 }}
          // No rubber band past min/max while pinching: the limits are hard.
          zoomAnimation={{ size: 0 }}
          // When the hall is smaller than the box it stays centred, so it
          // cannot be dragged out of sight.
          centerZoomedOut
          doubleClick={{ disabled: true }}
          onPanningStart={handlePanningStart}
          onPanningStop={handlePanningStop}
        >
          <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
            <TransformComponent
              wrapperClass="size-full! cursor-grab active:cursor-grabbing"
              contentClass="p-6 flex flex-col gap-8"
              wrapperProps={{ onClickCapture: handleClickCapture }}
            >
              <div className="w-full h-10 rounded-b-3xl bg-surface-light flex items-center justify-center text-white text-label-m uppercase">
                Screen
              </div>
              {seatMap.sections.map((section) => (
                <HallSection
                  key={section.name}
                  section={section}
                  getState={getState}
                  onToggle={onToggle}
                />
              ))}
            </TransformComponent>
            <ZoomControls />
          </div>
        </TransformWrapper>
      ) : isError ? (
        <ErrorState
          message="We couldn't load the seat map."
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      ) : (
        <span className="flex-1 text-muted text-body-m text-center">
          Loading seats...
        </span>
      )}
      <SeatLegend />
    </div>
  );
}
