import type { Film } from "@/features/films/types";
import { SearchResultItem } from "./SearchResultItem";

type SearchResultsListProps = {
  films: Film[];
  isLoading: boolean;
};

export function SearchResultsList({ films }: SearchResultsListProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-between items-center px-2.5 py-2">
        <span className="text-muted text-overline uppercase">
          Films & Events
        </span>
        <span className="text-muted text-body-s">{films.length} results</span>
      </div>
      <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto scrollbar-custom pr-1">
        {films.map((film) => (
          <SearchResultItem film={film} key={film.id} />
        ))}
      </div>
    </div>
  );
}
