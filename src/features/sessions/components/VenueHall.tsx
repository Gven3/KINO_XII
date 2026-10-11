import type { Venue } from "@/features/venues/types";
import type { Session } from "../types";
import { HallCard } from "./HallCard";
import { groupSessionsByHall } from "../utils";

type VenueHallProps = {
  sessions: Session[];
  venue: Venue;
  disabled: boolean;
};

export function VenueHall({ venue, sessions, disabled }: VenueHallProps) {
  const groupedSessions = groupSessionsByHall(sessions);
  return (
    <div className="flex flex-col gap-3">
      <span className="text-white text-button">{venue.name}</span>
      <div className="flex items-center gap-2.5">
        {groupedSessions.map((group, i) => (
          <HallCard key={i} group={group} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}
