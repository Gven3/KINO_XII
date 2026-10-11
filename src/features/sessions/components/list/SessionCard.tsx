import { Link } from "react-router";
import type { Session } from "../../types";
import { hasSessionStarted } from "../../utils";
import ticket_green from "@/assets/icons/ticket_green.svg";
import ticket_red from "@/assets/icons/ticket_red.svg";

const LOW_SEATS = 5;

type SessionCardProps = {
  session: Session;
  movieSlug: string;
};

export function SessionCard({ session, movieSlug }: SessionCardProps) {
  const isLow = session.seatsLeft <= LOW_SEATS;
  const hasStarted = hasSessionStarted(session);

  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-h3 text-white">{session.time}</span>
        <span className="px-2 py-0.5 rounded-full bg-surface-light text-label-s text-white">
          {session.format.name}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted text-body-s">{session.language.name}</span>
        {hasStarted || session.isSoldOut ? (
          <span className="text-muted text-body-s">
            {hasStarted ? "Started" : "Sold out"}
          </span>
        ) : (
          <span
            className={`flex items-center gap-1 text-label-s ${isLow ? "text-primary" : "text-success"}`}
          >
            <img src={isLow ? ticket_red : ticket_green} alt="" />
            {session.seatsLeft} left
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white text-label-s">
          {session.venue.name} · Hall {session.hall.name}
        </span>
        <span className="text-white text-button">₾{session.price}</span>
      </div>
    </>
  );

  const className =
    "w-63 shrink-0 p-4 flex flex-col gap-2 rounded-xl bg-surface";

  if (hasStarted || session.isSoldOut) {
    return (
      <div
        aria-disabled
        title={hasStarted ? "This session has already started" : undefined}
        className={`${className} opacity-40 cursor-not-allowed`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={`/movie/${movieSlug}?session=${session.id}`}
      className={`${className} hover:bg-surface-light transition-colors`}
    >
      {content}
    </Link>
  );
}
