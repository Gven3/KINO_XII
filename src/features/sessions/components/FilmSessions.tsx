import type { FilmDetails } from "@/features/films/types";
import { DayPicker } from "./DayPicker";
import { getNextDays, toDayOptions, toIsoDate } from "@/lib/date";
import { useSearchParams } from "react-router";
import { useFilmSessions } from "../hooks/useFilmSessions";
import { VenueHall } from "./VenueHall";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { ErrorState } from "@/components/ui/ErrorState";

type FilmSessionsProps = {
  film: FilmDetails;
};

export function FilmSessions({ film }: FilmSessionsProps) {
  const { user } = useCurrentUser();
  const isUnderAge = user?.age != null && user.age < film.ageRating.minAge;
  const [searchParams, setSearchParams] = useSearchParams();
  // Same picker as the Sessions page: next 7 days, today by default, in the URL.
  const currentDate = searchParams.get("date") ?? toIsoDate(new Date());
  const {
    data: sessions = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useFilmSessions(film.slug, currentDate);

  const setCurrentDate = (date: string) => {
    setSearchParams(
      (params) => {
        params.set("date", date);
        return params;
      },
      { replace: true },
    );
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h2 className="text-h2 text-white">Sessions</h2>
        <DayPicker
          dates={toDayOptions(getNextDays(7))}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
      {isUnderAge && (
        <span className="text-primary text-label-m">
          This film is rated {film.ageRating.code}. You cannot buy tickets for
          it with this account.
        </span>
      )}
      {isPending ? (
        <div
          role="status"
          aria-label="Loading sessions"
          className="flex flex-col gap-3"
        >
          <div className="h-5 w-48 animate-pulse rounded-md bg-surface" />
          <div className="h-33 w-full animate-pulse rounded-[18px] bg-surface" />
        </div>
      ) : isError ? (
        <ErrorState
          message="We couldn't load the sessions for this date."
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : sessions.length === 0 ? (
        <p className="text-muted text-body-l">
          There are no sessions on this date. Try another day.
        </p>
      ) : (
        sessions.map((session) => (
          <VenueHall
            key={session.venue.id}
            sessions={session.sessions}
            venue={session.venue}
            disabled={isUnderAge}
          />
        ))
      )}
    </div>
  );
}
