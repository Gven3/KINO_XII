export type AgeRating = {
  code: string;
  minAge: number;
  description: string;
};

export type Genre = {
  id: number;
  slug: string;
  name: string;
};

export type Format = {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
};

export type FilmKind = "film" | "live_event";

export type Film = {
  id: number;
  slug: string;
  title: string;
  kind: FilmKind;
  runtimeMinutes: number;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  isComingSoon: boolean;
  isNotified: boolean;
  isFeatured: boolean;
  fromPrice: number;
  ageRating: AgeRating;
  synopsis: string;
  genres: Genre[];
  formats: Format[];
};
