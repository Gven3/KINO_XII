import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Film } from "../../types";
import { Tag } from "../Tag";
import timer from "@/assets/icons/timer.svg";
import ticket from "@/assets/icons/ticket.svg";

type HeroMovieInfoProps = {
  film: Film;
};

export function HeroMovieInfo({ film }: HeroMovieInfoProps) {
  const runtimeTagValue = film.runtimeMinutes + " Min";
  const filmFormat = film.formats;
  return (
    <div className="absolute bottom-45 h-63.5 w-145 inset-x-17 flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Tag variant="primary" value={"PREMIERE · WEEK OF 15 SEPT"} />
        <h1 className="text-white text-display">{film.title}</h1>
        <div className="flex items-center gap-2">
          <Tag value={film.ageRating.code} variant="primary" />
          <Tag value={runtimeTagValue} variant="white" iconSrc={timer} />
          {filmFormat.map((format, i) => (
            <Tag key={i} variant="white" value={format.name} />
          ))}
        </div>
        <span className="text-white text-body-m line-clamp-3 h-13.5">
          {film.synopsis}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <ButtonLink
          to={""}
          variant="primary"
          className="flex gap-1 items-center"
        >
          <img src={ticket} alt="" />
          <span className="text-white text-button">Buy tickets</span>
        </ButtonLink>
        <ButtonLink to={""}>
          <span className="text-white text-button">All sessions</span>
        </ButtonLink>
      </div>
    </div>
  );
}
