import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { ErrorState } from "@/components/ui/ErrorState";
import { useRecentlyViewedFilms } from "../../hooks/useRecentlyViewedFilms";
import { RecentFilmCard } from "../RecentFilmCard";
import { RecentFilmCardSkeleton } from "../RecentFilmCardSkeleton";

export function RecentlyViewedSection() {
  const { films, isLoading, isError, isRetrying, refetch, skeletonCount } =
    useRecentlyViewedFilms();
  // Same carousel setup as FilmRow, so the row scrolls when it overflows.
  const [emblaRef] = useEmblaCarousel(
    { dragFree: true, align: "start", containScroll: "trimSnaps" },
    [WheelGesturesPlugin()],
  );

  // Hidden until the user has opened a film (or if every viewed film is gone).
  if (!isLoading && !isError && films.length === 0) return null;

  return (
    <section className="w-full px-17 pt-17 pb-12 flex flex-col gap-6 border-b border-b-surface-light">
      <h2 className="text-white text-h1">Recently viewed</h2>
      {isError ? (
        <ErrorState
          message="We couldn't load your recently viewed films."
          onRetry={refetch}
          isRetrying={isRetrying}
        />
      ) : (
        <div ref={emblaRef} className="overflow-hidden mask-r-from-90%">
          <ul className="flex gap-4">
            {isLoading
              ? Array.from({ length: skeletonCount }, (_, index) => (
                  <RecentFilmCardSkeleton key={index} />
                ))
              : films.map((film) => (
                  <RecentFilmCard key={film.id} film={film} />
                ))}
          </ul>
        </div>
      )}
    </section>
  );
}
