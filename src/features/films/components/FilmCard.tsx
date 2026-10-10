import type { Film } from "../types";
import { Tag } from "./Tag";
import { ButtonLink } from "@/components/ui/ButtonLink";

type FilmCardProps = {
  film: Film;
};

export function FilmCard({ film }: FilmCardProps) {
  const runtime = film.runtimeMinutes + " min";
  return (
    <li className="w-65 h-113 shrink-0 bg-surface rounded-[20px] p-3 flex flex-col gap-2.5">
      <div className="w-full h-75 overflow-hidden rounded-[14px]">
        <img src={film.posterUrl} alt="" className="size-full object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-h3">{film.title}</h3>
        <span className="text-muted text-body-s">
          {film.genres[0]?.name} · {runtime}
        </span>
        <Tag variant="primary" value={film.ageRating.code} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white text-label-s">From ₾{film.fromPrice}</span>
        <ButtonLink variant="primary" to={"/sessions"}>
          Buy Ticket
        </ButtonLink>
      </div>
    </li>
  );
}
