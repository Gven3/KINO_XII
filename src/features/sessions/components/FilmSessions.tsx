import type { FilmDetails } from "@/features/films/types";
import { DayPicker } from "./DayPicker";
import { toDayOptions } from "@/lib/date";
import { useState } from "react";
import { useFilmSessions } from "../hooks/useFilmSessions";
import { VenueHall } from "./VenueHall";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

type FilmSessionsProps = {
  film: FilmDetails;
};

export function FilmSessions({ film }: FilmSessionsProps) {
  const { user } = useCurrentUser();
  const isUnderAge = user?.age != null && user.age < film.ageRating.minAge;
  const firstSevenDays = toDayOptions(film.availableDates.slice(0, 7));
  const [currentDate, setCurrentDate] = useState<string>(
    firstSevenDays[0]
      ? firstSevenDays[0].value
      : new Date().toLocaleDateString(),
  );
  const { data: sessions = [], isLoading } = useFilmSessions(
    film.slug,
    currentDate,
  );

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h2 className="text-h2 text-white">Sessions</h2>
        <DayPicker
          dates={toDayOptions(film.availableDates.slice(0, 7))}
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
      {sessions.length === 0 && (
        <span className="text-h2 text-white">
          There are no sessions available.
        </span>
      )}
      {sessions.map((session, id) => (
        <VenueHall
          key={id}
          sessions={session.sessions}
          venue={session.venue}
          disabled={isUnderAge}
        />
      ))}
    </div>
  );
}
