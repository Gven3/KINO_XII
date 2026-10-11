import { ErrorState } from "@/components/ui/ErrorState";
import { useCarousel } from "../../hooks/useCarousel";
import { useFeaturedFilms } from "../../hooks/useFeaturedFilms";
import { HeroControls } from "./HeroControls";
import { HeroProgress } from "./HeroProgress";
import { HeroSkeleton } from "./HeroSkeleton";
import { HeroSlide } from "./HeroSlide";

export function HeroCarousel() {
  const { data, isPending, isError, isRefetching, refetch } =
    useFeaturedFilms();
  // The hero shows exactly four featured films.
  const films = data?.slice(0, 4) ?? [];
  const { currentIndex, goTo, next, prev } = useCarousel(films.length);

  if (isPending) return <HeroSkeleton />;

  if (isError || films.length === 0) {
    return (
      <section className="h-190 px-17 pt-28 flex items-center justify-center bg-surface/40">
        {isError ? (
          <ErrorState
            message="We couldn't load the featured films."
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        ) : (
          <p className="text-muted text-body-l">
            There are no featured films right now.
          </p>
        )}
      </section>
    );
  }

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
