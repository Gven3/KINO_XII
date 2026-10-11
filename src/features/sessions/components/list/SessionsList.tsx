import { ErrorState } from "@/components/ui/ErrorState";
import { Pagination } from "@/components/ui/Pagination";
import { useSessionFilters } from "../../hooks/useSessionFilters";
import { useSessions } from "../../hooks/useSessions";
import { MovieSessionsGroup } from "./MovieSessionsGroup";
import { SessionsListSkeleton } from "./SessionsListSkeleton";
import { SortDropdown } from "./SortDropdown";

export function SessionsList() {
  const { searchParams, filters, setSort, setPage } = useSessionFilters();
  const { data, isPending, isError, isRefetching, refetch, isPlaceholderData } =
    useSessions(searchParams);

  const total = data?.meta.totalSessions ?? 0;
  const counter = isPending
    ? "Loading sessions..."
    : total > 0
      ? `Showing ${total} sessions`
      : "No sessions found";

  return (
    <div
      className={`flex-1 min-w-0 flex flex-col gap-9 transition-opacity ${isPlaceholderData ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-white text-label-m">{counter}</span>
        <SortDropdown value={filters.sort} onChange={setSort} />
      </div>

      {isPending ? (
        <SessionsListSkeleton />
      ) : isError ? (
        <ErrorState
          message="We couldn't load the sessions."
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : data.data.length === 0 ? (
        <p className="text-muted text-body-l">
          No sessions match these filters on this date. Try another date or
          clear some filters.
        </p>
      ) : (
        data.data.map((group) => (
          <MovieSessionsGroup key={group.movie.id} group={group} />
        ))
      )}

      {data && data.meta.lastPage > 1 && (
        <Pagination
          page={data.meta.currentPage}
          lastPage={data.meta.lastPage}
          onChange={setPage}
        />
      )}
    </div>
  );
}
