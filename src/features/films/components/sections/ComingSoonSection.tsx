import { ErrorState } from "@/components/ui/ErrorState";
import { useUpcomingFilms } from "../../hooks/useUpcomingFilms";
import { ComingSoonCard } from "../ComingSoonCard";
import { ComingSoonCardSkeleton } from "../ComingSoonCardSkeleton";
import { FilmRow } from "../FilmRow";

const SKELETON_CARDS = 4;

export function ComingSoonSection() {
  const {
    data: films = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useUpcomingFilms();

  const fallback = isError ? (
    <ErrorState
      message="We couldn't load the upcoming films."
      onRetry={() => refetch()}
      isRetrying={isRefetching}
    />
  ) : !isPending && films.length === 0 ? (
    <p className="text-muted text-body-l">
      No upcoming films have been announced yet.
    </p>
  ) : undefined;

  return (
    <FilmRow title="Coming Soon" fallback={fallback}>
      {isPending
        ? Array.from({ length: SKELETON_CARDS }, (_, index) => (
            <ComingSoonCardSkeleton key={index} />
          ))
        : films.map((film) => <ComingSoonCard key={film.id} film={film} />)}
    </FilmRow>
  );
}
