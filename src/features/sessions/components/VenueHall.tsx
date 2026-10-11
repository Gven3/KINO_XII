import type { Venue } from "@/features/venues/types";
import type { Session } from "../types";
import { HallCard } from "./HallCard";

type VenueHallProps = {
  sessions: Session[];
  venue: Venue;
};

export function VenueHall({ venue, sessions }: VenueHallProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-white text-button">{venue.name}</span>
      <div className="flex items-center gap-2.5">
        {sessions.map((session) => (
          <HallCard session={session} />
        ))}
      </div>
    </div>
  );
}
