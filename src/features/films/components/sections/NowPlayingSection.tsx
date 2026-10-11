import { ErrorState } from "@/components/ui/ErrorState";
import { useNowPlayingFilms } from "../../hooks/useNowPlayingFilms";
import { FilmCard } from "../FilmCard";
import { FilmCardSkeleton } from "../FilmCardSkeleton";
import { FilmRow } from "../FilmRow";

const SKELETON_CARDS = 6;

export function NowPlayingSection() {
  const {
    data: films = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useNowPlayingFilms();

  const fallback = isError ? (
    <ErrorState
      message="We couldn't load the films now playing."
      onRetry={() => refetch()}
      isRetrying={isRefetching}
    />
  ) : !isPending && films.length === 0 ? (
    <p className="text-muted text-body-l">
      There are no films in cinemas right now. Check back soon.
    </p>
  ) : undefined;

  return (
    <FilmRow title="Now Playing" seeAllHref="/sessions" fallback={fallback}>
      {isPending
        ? Array.from({ length: SKELETON_CARDS }, (_, index) => (
            <FilmCardSkeleton key={index} />
          ))
        : films.map((film) => <FilmCard film={film} key={film.id} />)}
    </FilmRow>
  );
}
