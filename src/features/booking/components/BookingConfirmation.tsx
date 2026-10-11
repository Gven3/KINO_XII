import { useNavigate } from "react-router";
import { Button } from "@/components/ui/Button";
import { formatShortDayDate } from "@/lib/date";
import check_icon from "@/assets/icons/check.svg";
import type { Order } from "../types";
import { summarizeTickets } from "../utils";
import { SummaryRow } from "./ui/SummaryRow";
import { Subtotal } from "./ui/Subtotal";

// Rendered from the order response, so it shows what was actually stored.
export function BookingConfirmation({ order }: { order: Order }) {
  const navigate = useNavigate();
  const { session } = order;

  return (
    <div className="py-8 flex flex-col items-center gap-6">
      <span className="size-18 rounded-full bg-success flex items-center justify-center">
        <img src={check_icon} alt="" className="size-9" />
      </span>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-h1 text-white">Booking confirmed!</h2>
        <p className="max-w-113 text-muted text-body-l">
          Your tickets are ready. We've sent the confirmation to your email.
        </p>
      </div>
      <span className="px-14 py-1.5 rounded-full bg-surface-light text-white text-label-m uppercase">
        Order #{order.reference}
      </span>

      <div className="w-215 max-w-full p-6 rounded-[18px] bg-surface flex flex-col gap-4">
        <div className="pb-4 flex gap-3 border-b border-surface-light">
          <img
            src={session.movie.posterUrl}
            alt=""
            className="w-16 h-20 rounded-md object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="text-h3 text-white uppercase">
              {session.movie.title}
            </span>
            <span className="text-muted text-body-m">
              {session.venue.name} · Hall {session.hall.name} ·{" "}
              {formatShortDayDate(session.date)} · {session.time}
            </span>
          </div>
        </div>
        <SummaryRow
          label="Seats"
          value={order.tickets.map((ticket) => ticket.seatCode).join(", ")}
        />
        <SummaryRow
          label="Tickets"
          value={summarizeTickets(
            order.tickets.map((ticket) => ticket.ticketType.name),
          )}
        />
        <div className="pt-4 border-t border-surface-light">
          <Subtotal label="Total paid" amount={order.totalPrice} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={() => navigate("/profile/tickets")}>
          View my tickets
        </Button>
        <Button variant="dark" onClick={() => navigate("/")}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
