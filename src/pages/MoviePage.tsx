import { MovieHero } from "@/features/films/components/movie-details/MovieHero";
import { MovieDetails } from "@/features/films/components/movie-details/MovieDetails";
import { useFilmBySlug } from "@/features/films/hooks/useFilmBySlug";
import { FilmSessions } from "@/features/sessions/components/FilmSessions";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ErrorState } from "@/components/ui/ErrorState";
import { ApiError } from "@/lib/apiClient";
import { recentlyViewed } from "@/features/films/recentlyViewed";
import { BookingModal } from "@/features/booking/components/BookingModal";

export function MoviePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const {
    data: film = null,
    isPending,
    error,
    isRefetching,
    refetch,
  } = useFilmBySlug(slug);

  // Only films that actually loaded go into Recently viewed.
  const loadedSlug = film?.slug;
  useEffect(() => {
    if (loadedSlug) recentlyViewed.add(loadedSlug);
  }, [loadedSlug]);
  if (isPending) {
    return (
      <div role="status" aria-label="Loading film">
        <div className="h-150 animate-pulse bg-surface" />
        <div className="px-13 py-8 flex gap-10">
          <div className="flex-1 h-80 animate-pulse rounded-[18px] bg-surface" />
          <div className="w-94 h-80 animate-pulse rounded-[18px] bg-surface" />
        </div>
      </div>
    );
  }

  if (!film) {
    const isNotFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="px-15 pt-36 pb-16">
        {isNotFound ? (
          <p className="text-muted text-body-l">
            This film could not be found.{" "}
            <Link to="/" className="text-primary text-button">
              Back to home
            </Link>
          </p>
        ) : (
          <ErrorState
            message="We couldn't load this film."
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {film && (
        <>
          <MovieHero film={film} />
          <div className="w-full min-h-125 px-13 py-8 flex gap-10">
            <div className="flex-1">
              <FilmSessions film={film} />
            </div>
            <MovieDetails film={film} />
          </div>
          <BookingModal />
        </>
      )}
    </>
  );
}
