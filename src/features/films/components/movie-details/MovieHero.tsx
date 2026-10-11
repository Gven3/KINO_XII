import type { Film } from "../../types";
import { Tag } from "../Tag";
import timer_icon from "@/assets/icons/timer.svg";

type MovieHeroProps = {
  film: Film;
};

export function MovieHero({ film }: MovieHeroProps) {
  const runtime = film.runtimeMinutes + " Min";
  return (
    <div className="w-full h-150 relative">
      <img src={film.backdropUrl} alt="" className="size-full object-cover" />
      <div className="absolute size-full top-0 left-0 bg-background/20 backdrop-blur-lg" />
      <div className="absolute bottom-10 left-15 flex gap-8">
        <div className="w-74 h-93 rounded-[14px] overflow-hidden">
          <img src={film.posterUrl} alt="" className="size-full object-cover" />
        </div>
        <div className="w-140 flex flex-col justify-end gap-4">
          <Tag value="NOW PLAYING" variant="primary" />
          <span className="text-white text-display uppercase">
            {film.title}
          </span>
          <span className="text-white text-body-m">{film.synopsis}</span>
          <div className="flex items-center gap-2">
            <Tag value={film.ageRating.code} variant="primary" />
            <Tag value={runtime} iconSrc={timer_icon} />
            {film.formats.map((format) => (
              <Tag key={format.id} value={format.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
