import type { Film } from "../types";
import { Tag } from "./Tag";
import { ButtonLink } from "@/components/ui/ButtonLink";

type FilmCardProps = {
  film: Film;
};

export function FilmCard({ film }: FilmCardProps) {
  const runtime = film.runtimeMinutes + " min";
  return (
    <li className=" group w-65 h-113 shrink-0 bg-surface rounded-[20px] p-3 flex flex-col gap-2.5 justify-between hover:w-100 transition-[width] duration-200">
      <div className="w-full h-75 group-hover:h-50 transition-[height] duration-200 overflow-hidden rounded-[14px]">
        <img src={film.posterUrl} alt="" className="size-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <h3 className="text-white text-h3">{film.title}</h3>
        <span className="text-muted text-body-s">
          {film.genres[0]?.name} · {runtime}
        </span>
        <Tag variant="primary" value={film.ageRating.code} />
        <p
          className={`text-muted text-body-s invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[opacity,visibility] duration-200 line-clamp-4`}
        >
          {film.synopsis}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white text-label-s">From ₾{film.fromPrice}</span>
        <ButtonLink variant="primary" to={"/movie/" + film.slug}>
          Buy Ticket
        </ButtonLink>
      </div>
    </li>
  );
}
