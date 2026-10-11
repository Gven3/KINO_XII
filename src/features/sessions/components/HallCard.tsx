import type { Session } from "../types";
import type { HallSessions } from "../utils";
import { SessionTicket } from "./SessionTicket";

type HallCardProps = {
  group: HallSessions;
  disabled: boolean;
};

export function HallCard({ group, disabled }: HallCardProps) {
  return (
    <div className="h-33 bg-surface rounded-[18px] p-4 flex flex-col gap-2">
      <span className="text-label-s text-white">Hall {group.hall.name}</span>

      <div className="flex items-center gap-2">
        {group.sessions.map((session: Session) => (
          <SessionTicket
            key={session.id}
            session={session}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
