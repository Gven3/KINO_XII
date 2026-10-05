import popcornIcon from "@/assets/icons/popcorn_icon.svg";
import { SearchMessage } from "./SearchMessage";

export function SearchPrompt() {
  return (
    <SearchMessage
      icon={popcornIcon}
      title="What do you want to watch?"
      description="Search by title, director or cast"
    />
  );
}
