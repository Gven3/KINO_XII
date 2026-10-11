import { MovieHero } from "@/features/films/components/movie-details/MovieHero";
import { MovieDetails } from "@/features/films/components/movie-details/MovieDetails";
import { useFilmBySlug } from "@/features/films/hooks/useFilmBySlug";
import { FilmSessions } from "@/features/sessions/components/FilmSessions";
import { useEffect } from "react";
import { useParams } from "react-router";
import { recentlyViewed } from "@/features/films/recentlyViewed";
import { BookingModal } from "@/features/booking/components/BookingModal";

export function MoviePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: film = null, isLoading, error } = useFilmBySlug(slug);

  // Only films that actually loaded go into Recently viewed.
  const loadedSlug = film?.slug;
  useEffect(() => {
    if (loadedSlug) recentlyViewed.add(loadedSlug);
  }, [loadedSlug]);
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
