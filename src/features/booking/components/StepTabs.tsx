import type { BookingStep } from "../types";

const STEPS: { id: BookingStep; label: string }[] = [
  { id: "seats", label: "Seats" },
  { id: "checkout", label: "Checkout" },
];

type StepTabsProps = {
  step: BookingStep;
  onSeats: () => void;
};

export function StepTabs({ step, onSeats }: StepTabsProps) {
  return (
    <div className="flex h-11 rounded-full bg-surface">
      {STEPS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          // Only going back is a tab click; Checkout is reached by holding seats.
          disabled={id === "checkout" || step === "seats"}
          onClick={onSeats}
          className={`flex-1 rounded-full text-white text-button uppercase transition-colors enabled:cursor-pointer ${step === id ? "bg-primary" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
