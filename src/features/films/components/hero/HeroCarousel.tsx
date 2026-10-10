import { useCarousel } from "../../hooks/useCarousel";
import { useFeaturedFilms } from "../../hooks/useFeaturedFilms";
import { HeroControls } from "./HeroControls";
import { HeroProgress } from "./HeroProgress";
import { HeroSlide } from "./HeroSlide";

export function HeroCarousel() {
  const { data: films = [], isError } = useFeaturedFilms();
  const { currentIndex, goTo, next, prev } = useCarousel(films.length);

  if (isError || films.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured films"
      className="group relative h-190 overflow-hidden"
    >
      {films.map((film, index) => (
        <HeroSlide
          key={film.id}
          film={film}
          isActive={index === currentIndex}
          position={index + 1}
          total={films.length}
        />
      ))}

      <div className="absolute inset-x-17 bottom-10.5 z-10 flex items-center gap-6">
        <HeroProgress
          count={films.length}
          currentIndex={currentIndex}
          onSelect={goTo}
          onComplete={next}
        />
        <HeroControls onPrev={prev} onNext={next} />
      </div>
    </section>
  );
}
