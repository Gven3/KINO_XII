import { useState } from "react";
import { DetailItem } from "@/features/films/components/movie-details/DetailItem";
import { Tag } from "@/features/films/components/Tag";
import type { Order } from "@/features/booking/types";
import { formatShortDayDate } from "@/lib/date";
import { getRefundNote } from "../utils";
import { RefundDialog } from "./RefundDialog";

type TicketCardProps = {
  order: Order;
};

export function TicketCard({ order }: TicketCardProps) {
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const { session } = order;
  const refundNote = getRefundNote(order);

  return (
    <div className="p-6 flex gap-6 rounded-[28px] bg-surface">
      <img
        src={session.movie.posterUrl}
        alt=""
        className="w-28 h-37 shrink-0 rounded-xl object-cover"
      />

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-h2 text-white">{session.movie.title}</h3>
          <Tag value={session.movie.ageRating.code} variant="primary" />
          <span className="text-muted text-body-m">
            {session.movie.runtimeMinutes} min
          </span>
        </div>
        <div className="flex gap-10">
          <DetailItem
            label="Date"
            value={`${formatShortDayDate(session.date)} · ${session.time}`}
          />
          <DetailItem
            label="Venue"
            value={`${session.venue.name} · Hall ${session.hall.name}`}
          />
          <DetailItem
            label="Format"
            value={`${session.format.name} · ${session.language.name}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted text-label-s uppercase">Seats</span>
          {order.tickets.map((ticket) => (
            <span
              key={ticket.id}
              className="px-2.5 py-1 rounded-md bg-surface-light text-white text-label-s"
            >
              {ticket.seatCode} · {ticket.ticketType.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-58 shrink-0 pl-6 flex flex-col justify-center gap-3 border-l border-dashed border-surface-light">
        <DetailItem label="Order" value={`#${order.reference}`} />
        <div className="flex items-center justify-between">
          <span className="text-white text-body-m">Total paid</span>
          <span className="text-white text-h2">₾{order.totalPrice}</span>
        </div>
        {/* Wrapped so the reason still shows on hover while the button is disabled. */}
        <span title={order.isRefundable ? undefined : refundNote}>
          <button
            type="button"
            disabled={!order.isRefundable}
            onClick={() => setIsRefundOpen(true)}
            className="w-full h-10 rounded-full bg-surface-light text-white text-button cursor-pointer transition-colors enabled:hover:bg-subtle disabled:text-muted disabled:cursor-not-allowed"
          >
            Refund
          </button>
        </span>
        <span className="text-muted text-body-s text-center">{refundNote}</span>
      </div>

      <RefundDialog
        order={order}
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
      />
    </div>
  );
}
