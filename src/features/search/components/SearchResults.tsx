import { useDebounce } from "@/hooks/useDebounce";
import { useSearchFilms } from "../hooks/useSearchFilms";
import { SearchResultsSkeleton } from "./SearchResultsSkeleton";
import { SearchResultsList } from "./SearchResultList";
import { SearchNoResults } from "./SearchNoResults";

type SearchResultsProps = {
  query: string;
};
export function SearchResults({ query }: SearchResultsProps) {
  const debouncedValue = useDebounce(query, 300);
  const {
    data: results = [],
    isLoading,
    isError,
  } = useSearchFilms(debouncedValue);

  if (isError) return <div className="text-error text-body-m">Error</div>;
  if (isLoading) return <SearchResultsSkeleton />;
  if (results.length === 0) return <SearchNoResults query={debouncedValue} />;

  return <SearchResultsList films={results} isLoading={isLoading} />;
}
