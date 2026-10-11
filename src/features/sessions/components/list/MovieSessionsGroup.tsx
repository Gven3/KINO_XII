import { Tag } from "@/features/films/components/Tag";
import type { MovieSessions } from "../../types";
import { SessionCard } from "./SessionCard";

type MovieSessionsGroupProps = {
  group: MovieSessions;
};

export function MovieSessionsGroup({ group }: MovieSessionsGroupProps) {
  const { movie, sessions } = group;
  return (
    <div className="flex flex-col gap-4 pb-9 border-b border-surface-light">
      <div className="flex items-center gap-4">
        <img
          src={movie.posterUrl}
          alt=""
          className="w-14 h-20 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-h3 text-white">{movie.title}</span>
            <Tag value={movie.ageRating.code} variant="primary" />
          </div>
          <span className="text-muted text-body-m">
            {movie.runtimeMinutes} min
          </span>
        </div>
      </div>
      <div className="flex gap-3.5 overflow-x-auto [scrollbar-width:none]">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            movieSlug={movie.slug}
          />
        ))}
      </div>
    </div>
  );
}
