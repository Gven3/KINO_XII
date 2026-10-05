import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchPrompt } from "./SearchPrompt";
import { SearchResults } from "./SearchResults";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const isEmpty = query.trim() === "";

  return (
    <div className="flex flex-col gap-4 w-120">
      <SearchInput query={query} onValueChange={setQuery} />
      <div className="w-full h-62 bg-background rounded-2xl border border-surface-light shadow-[0_2px_6px_rgb(0_0_0/0.2)] p-2">
        {isEmpty ? <SearchPrompt /> : <SearchResults query={query} />}
      </div>
    </div>
  );
}
