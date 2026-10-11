import { useIsMutating } from "@tanstack/react-query";
import { formatShortDayDate } from "@/lib/date";
import { CREATE_ORDER_KEY } from "../../hooks/useCreateOrder";
import type { SeatHold, SessionDetails } from "../../types";
import { summarizeTickets } from "../../utils";
import { BookingButton } from "../ui/BookingButton";
import { Subtotal } from "../ui/Subtotal";
import { SummaryRow } from "../ui/SummaryRow";
import { CHECKOUT_FORM_ID } from "./CheckoutForm";

type OrderSummaryProps = {
  session: SessionDetails;
  hold: SeatHold;
};

export function OrderSummary({ session, hold }: OrderSummaryProps) {
  const isPaying = useIsMutating({ mutationKey: CREATE_ORDER_KEY }) > 0;

  return (
    <>
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <h3 className="text-h3 text-white">Summary</h3>
        <div className="p-5 rounded-[18px] bg-surface flex flex-col gap-4">
          <div className="pb-4 flex flex-col gap-1 border-b border-surface-light">
            <span className="text-h3 text-white uppercase">
              {session.movie.title}
            </span>
            <span className="text-muted text-body-m">
              Hall {session.hall.name} · {formatShortDayDate(session.date)} ·{" "}
              {session.time}
            </span>
          </div>
          <SummaryRow
            label="Seats"
            value={hold.seats.map((seat) => seat.code).join(", ")}
          />
          <SummaryRow
            label="Tickets"
            value={summarizeTickets(
              hold.seats.map((seat) => seat.ticketType.name),
            )}
          />
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-4">
        <Subtotal amount={hold.subtotal} />
        <BookingButton
          type="submit"
          form={CHECKOUT_FORM_ID}
          disabled={isPaying}
        >
          {isPaying ? "Paying..." : "Pay: Complete order"}
        </BookingButton>
      </div>
    </>
  );
}
