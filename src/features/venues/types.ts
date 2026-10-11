import type { Format } from "@/features/films/types";

export type Venue = {
  id: number;
  slug: string;
  name: string;
  city: string;
};

export type VenueWithFormats = Venue & {
  formats: Format[];
};
