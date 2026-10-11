import type { AgeRating, Format } from "@/features/films/types";
import type { Language, TimeBand } from "@/features/sessions/types";
import type { VenueWithFormats } from "@/features/venues/types";

export type TimeBandOption = {
  id: TimeBand;
  label: string;
};

export type SortOption = {
  id: string;
  label: string;
};

export type TicketType = {
  id: number;
  slug: string;
  name: string;
  priceRatio: number;
  note: string | null;
  blockedFromRatingAge: number | null;
};

export type FilterOptions = {
  venues: VenueWithFormats[];
  formats: Format[];
  languages: Language[];
  timeBands: TimeBandOption[];
  sorts: SortOption[];
  ticketTypes: TicketType[];
  ageRatings: AgeRating[];
  maxSeatsPerOrder: number;
  holdMinutes: number;
};
