import searchIcon from "@/assets/icons/search.svg";
import { SearchMessage } from "./SearchMessage";

type SearchNoResultsProps = {
  query: string;
};

export function SearchNoResults({ query }: SearchNoResultsProps) {
  return (
    <SearchMessage
      icon={searchIcon}
      title={`No results for "${query}"`}
      description="Check the spelling or try another film or live event."
    />
  );
}
