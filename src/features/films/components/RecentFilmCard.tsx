import { Link } from "react-router";
import type { Film } from "../types";
import { Tag } from "./Tag";

type RecentFilmCardProps = {
  film: Film;
};

export function RecentFilmCard({ film }: RecentFilmCardProps) {
  return (
    <li className="shrink-0">
      <Link
        to={"/movie/" + film.slug}
        className="w-93 p-2.5 flex items-center gap-3 rounded-[14px] bg-surface transition-colors hover:bg-surface-light"
      >
        <img
          src={film.backdropUrl}
          alt=""
          className="w-25 h-19 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex flex-col gap-1">
          <span className="text-white text-label-m uppercase truncate">
            {film.title}
          </span>
          <span className="text-muted text-body-s">
            {film.genres[0]?.name} · {film.runtimeMinutes} min
          </span>
          <Tag variant="primary" value={film.ageRating.code} />
        </div>
      </Link>
    </li>
  );
}
