import { formatDayDate } from "@/lib/date";
import type { SeatHold, SessionDetails } from "../types";
import { HoldTimer } from "./HoldTimer";

type BookingHeaderProps = {
  session: SessionDetails;
  hold: SeatHold | null;
};

export function BookingHeader({ session, hold }: BookingHeaderProps) {
  const details = [
    session.venue.name,
    `Hall ${session.hall.name}`,
    formatDayDate(session.date),
    session.time,
    session.format.name,
    session.language.name,
  ].join(" · ");

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-h1 text-white uppercase">{session.movie.title}</h2>
        <span className="text-muted text-body-m">{details}</span>
      </div>
      {hold && <HoldTimer key={hold.expiresAt} expiresAt={hold.expiresAt} />}
    </div>
  );
}
