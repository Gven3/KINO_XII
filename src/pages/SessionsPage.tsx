import { SessionsList } from "@/features/sessions/components/list/SessionsList";
import { FiltersSidebar } from "@/features/sessions/components/filters/FiltersSidebar";

export function SessionsPage() {
  return (
    <div className="px-15 pt-36 pb-16 flex flex-col gap-11">
      <div className="flex flex-col gap-1">
        <h1 className="text-h1 text-white">Sessions</h1>
        <span className="text-muted text-body-m">
          Browse showtimes across all venues
        </span>
      </div>
      <div className="flex items-start gap-14">
        <FiltersSidebar />
        <SessionsList />
      </div>
    </div>
  );
}
