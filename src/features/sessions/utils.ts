import type { Hall, Session } from "./types";

export type HallSessions = {
  hall: Hall;
  sessions: Session[];
};

export function groupSessionsByHall(sessions: Session[]): HallSessions[] {
  const groups = new Map<number, HallSessions>();

  for (const session of sessions) {
    const group = groups.get(session.hall.id);

    if (group) {
      group.sessions.push(session);
    } else {
      groups.set(session.hall.id, { hall: session.hall, sessions: [session] });
    }
  }

  return [...groups.values()];
}
