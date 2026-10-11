import { Pagination } from "@/components/ui/Pagination";
import { useSessionFilters } from "../../hooks/useSessionFilters";
import { useSessions } from "../../hooks/useSessions";
import { MovieSessionsGroup } from "./MovieSessionsGroup";
import { SortDropdown } from "./SortDropdown";

export function SessionsList() {
  const { searchParams, filters, setSort, setPage } = useSessionFilters();
  const { data, isPlaceholderData } = useSessions(searchParams);

  const total = data?.meta.totalSessions ?? 0;

  return (
    <div
      className={`flex-1 min-w-0 flex flex-col gap-9 transition-opacity ${isPlaceholderData ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-white text-label-m">
          {total > 0 ? `Showing ${total} sessions` : "No sessions found"}
        </span>
        <SortDropdown value={filters.sort} onChange={setSort} />
      </div>

      {data?.data.map((group) => (
        <MovieSessionsGroup key={group.movie.id} group={group} />
      ))}

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
