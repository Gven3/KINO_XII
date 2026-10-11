import type { Film, Format } from "@/features/films/types";
import type { Venue } from "@/features/venues/types";

export type Hall = {
  id: number;
  name: string;
  venue: Venue;
};

export type Language = {
  id: number;
  slug: string;
  name: string;
  code: string;
};

export type TimeBand = "morning" | "afternoon" | "evening" | "night";

export type Session = {
  id: number;
  startsAt: string;
  date: string;
  time: string;
  timeBand: TimeBand;
  price: number;
  seatsLeft: number;
  isSoldOut: boolean;
  hall: Hall;
  venue: Venue;
  format: Format;
  language: Language;
};

export type VenueSessions = {
  venue: Venue;
  sessions: Session[];
};

export type MovieSessions = {
  movie: Omit<Film, "synopsis">;
  sessions: Session[];
};

export type SessionsMeta = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  totalSessions: number;
  totalMovies: number;
  date: string;
};
