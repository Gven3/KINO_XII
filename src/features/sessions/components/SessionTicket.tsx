import type { Session } from "../types";
import ticket_icon from "@/assets/icons/ticket_gray.svg";
import { useBookingModal } from "@/features/booking/hooks/useBookingModal";

type SessionTicketProps = {
  session: Session;
  disabled: boolean;
};

export function SessionTicket({ session, disabled }: SessionTicketProps) {
  const { openBooking } = useBookingModal();
  return (
    <button
      type="button"
      disabled={disabled || session.isSoldOut}
      onClick={() => openBooking(session.id)}
      className="relative flex h-20 w-62 cursor-pointer rounded-xl bg-background disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex w-40 flex-col items-center justify-center gap-2">
        <h2 className="text-h2 text-white">{session.time}</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-muted text-body-s">
            {session.language.code}
          </span>
          <span className="px-3 py-1 bg-surface-light rounded-full text-label-s text-muted/70">
            {session.format.name}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-2">
        <span className="absolute -top-2 left-0 size-4 -translate-x-1/2 rounded-full bg-surface" />
        <span className="absolute -bottom-2 left-0 size-4 -translate-x-1/2 rounded-full bg-surface" />
        <span className="absolute inset-y-3 left-0 w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,white_0_5px,transparent_5px_10px)]" />
        <h3 className="text-primary text-h3">₾ {session.price}</h3>
        <span className="flex items-start text-muted gap-1">
          <img src={ticket_icon} alt="" />
          <span className="text-body-s text-muted">
            {session.isSoldOut ? "Sold out" : `${session.seatsLeft} left`}
          </span>
        </span>
      </div>
    </button>
  );
}
