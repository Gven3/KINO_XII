import type { SeatDisplayState } from "../../utils";

export const SEAT_STYLES: Record<SeatDisplayState, string> = {
  available: "border border-subtle bg-surface text-white",
  selected: "bg-primary text-white",
  sold: "bg-surface text-subtle",
  held: "bg-[repeating-linear-gradient(135deg,var(--color-surface-light)_0_6px,var(--color-surface)_6px_12px)] text-muted",
  unavailable: "",
};
