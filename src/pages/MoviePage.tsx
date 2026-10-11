import { MovieHero } from "@/features/films/components/movie-details/MovieHero";
import { useFilmBySlug } from "@/features/films/hooks/useFilmBySlug";
import { FilmSessions } from "@/features/sessions/components/FilmSessions";
import { useParams } from "react-router";

export function MoviePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: film = null, isLoading, error } = useFilmBySlug(slug);
  return (
    <>
      {film && (
        <>
          <MovieHero film={film} />
          <div className="w-full px-13 py-8">
            <FilmSessions film={film} />
          </div>
        </>
      )}
    </>
  );
}
