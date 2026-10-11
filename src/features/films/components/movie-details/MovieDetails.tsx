import type { FilmDetails } from "../../types";
import { DetailItem } from "./DetailItem";
import { RatingNote } from "./RatingNote";
import { formatLongDate } from "@/lib/date";

type MovieDetailsProps = {
  film: FilmDetails;
};

export function MovieDetails({ film }: MovieDetailsProps) {
  return (
    <div className="w-94 shrink-0 flex flex-col gap-4">
      <h2 className="text-h2 text-white">Details</h2>
      <DetailItem label="Director" value={film.director} />
      <DetailItem label="Main cast" value={film.cast} />
      <DetailItem label="Duration" value={film.runtimeMinutes + " minutes"} />
      <DetailItem
        label="Release date"
        value={formatLongDate(film.releaseDate)}
      />
      <DetailItem
        label="Formats"
        value={film.formats.map((format) => format.name).join(", ")}
      />
      <DetailItem label="From" value={"₾" + film.fromPrice} />
      <RatingNote ageRating={film.ageRating} />
    </div>
  );
}
