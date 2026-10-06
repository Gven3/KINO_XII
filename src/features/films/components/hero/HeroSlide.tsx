import type { Film } from "../../types";
import { HeroMovieInfo } from "./HeroMovieInfo";

type HeroSlideProps = {
  film: Film;
  isActive: boolean;
  position: number;
  total: number;
};

export function HeroSlide({ film, isActive, position, total }: HeroSlideProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}`}
      inert={!isActive}
      className={`w-full h-full absolute top-0 left-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
    >
      <img
        src={film.backdropUrl}
        alt=""
        fetchPriority={position === 1 ? "high" : "auto"}
        className="size-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent"></div>

      <HeroMovieInfo film={film} />
    </div>
  );
}
