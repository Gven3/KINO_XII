import { Link } from "react-router";
import type { Film } from "../types";

type FilmCardProps = {
  film: Film;
};

export function FilmCard({ film }: FilmCardProps) {
  const minAge = film.ageRating.minAge.toString() + "+";
  const runtime = film.runtimeMinutes + "min";
  return (
    <Link
      to={`/films/${film.id}`}
      className="w-full h-18 flex justify-between items-center py-2 pl-2.5 pr-5 gap-3.5 cursor-pointer hover:bg-white/10 duration-200 transition-colors rounded-lg"
    >
      <div className="w-10 rounded-md overflow-hidden">
        <img src={film.posterUrl} alt={film.title} className="object-cover" />
      </div>
      <div className="flex flex-col flex-1 gap-0.5">
        <span className="text-muted text-label-m">{film.title}</span>
        <div className="text-body-s text-muted flex gap-1 items-center">
          <span className="first-letter:uppercase">{film.kind}</span>
          <span>·</span>
          <span>{minAge}</span>
          <span>·</span>
          <span>{runtime}</span>
        </div>
      </div>
      {film.isComingSoon ? (
        <span className="text-label-m text-warning">Coming Soon</span>
      ) : (
        <span className="text-white text-label-m">from ₾{film.fromPrice}</span>
      )}
    </Link>
  );
}
