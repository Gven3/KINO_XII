import { useBooking } from "../hooks/useBooking";
import type { SeatHold, SessionDetails } from "../types";
import { BookingConfirmation } from "./BookingConfirmation";
import { BookingHeader } from "./BookingHeader";
import { CheckoutForm } from "./checkout/CheckoutForm";
import { OrderSummary } from "./checkout/OrderSummary";
import { SeatMapView } from "./seats/SeatMapView";
import { SeatsPanel } from "./seats/SeatsPanel";
import { StepTabs } from "./StepTabs";
import { BookingNotice } from "./ui/BookingNotice";

type BookingStepsProps = {
  session: SessionDetails;
  initialHold: SeatHold | null;
};

export function BookingSteps({ session, initialHold }: BookingStepsProps) {
  const booking = useBooking(session, initialHold);

  if (booking.order) return <BookingConfirmation order={booking.order} />;

  const checkoutHold = booking.step === "checkout" ? booking.hold : null;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-8">
      <BookingHeader session={session} hold={booking.hold} />
      <div className="flex-1 min-h-0 flex gap-7">
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <StepTabs step={booking.step} onSeats={booking.goToSeats} />
          {booking.notice && <BookingNotice message={booking.notice} />}
          {checkoutHold ? (
            <CheckoutForm
              holdId={checkoutHold.holdId}
              onPaid={booking.completeOrder}
              onExpired={booking.expireHold}
              onContested={booking.loseSeats}
            />
          ) : (
            <SeatMapView
              seatMap={booking.seatMap}
              selection={booking.selection}
              takenCodes={booking.takenCodes}
              onToggle={booking.toggleSeat}
            />
          )}
        </div>
        <div className="w-px bg-surface-light" />
        <div className="w-103 shrink-0 flex flex-col">
          {checkoutHold ? (
            <OrderSummary session={session} hold={checkoutHold} />
          ) : (
            <SeatsPanel
              selection={booking.selection}
              ticketTypes={booking.ticketTypes}
              maxSeats={booking.maxSeats}
              subtotal={booking.subtotal}
              blockReason={booking.blockReason}
              canContinue={booking.canContinue}
              isHolding={booking.isHolding}
              getPrice={booking.getPrice}
              onTicketTypeChange={booking.changeTicketType}
              onRemove={booking.removeSeat}
              onNext={booking.holdSeats}
            />
          )}
        </div>
      </div>
    </div>
  );
}
