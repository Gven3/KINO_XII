import { useSearchParams } from "react-router";
import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";
import { toIsoDate } from "@/lib/date";

export type FilterKey = "venue" | "format" | "language" | "time";

const FILTER_KEYS: FilterKey[] = ["venue", "format", "language", "time"];

function readList(params: URLSearchParams, key: FilterKey) {
  return params.get(key)?.split(",") ?? [];
}

export function useSessionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: options } = useFilterOptions();

  const venues = readList(searchParams, "venue");
  const selectedVenues =
    options?.venues.filter((venue) => venues.includes(venue.slug)) ?? [];

  // With no venue selected every format is available,
  // otherwise only the formats the selected venues can show.
  const availableFormats =
    selectedVenues.length === 0
      ? (options?.formats ?? [])
      : (options?.formats.filter((format) =>
          selectedVenues.some((venue) =>
            venue.formats.some((f) => f.id === format.id),
          ),
        ) ?? []);

  const formats = readList(searchParams, "format").filter((slug) =>
    availableFormats.some((format) => format.slug === slug),
  );
  const languages = readList(searchParams, "language");
  const timeBands = readList(searchParams, "time");
  const date = searchParams.get("date") ?? toIsoDate(new Date());

  const activeCount =
    venues.length + formats.length + languages.length + timeBands.length;

  // Every filter change goes back to page 1, so nobody lands on an empty page.
  function updateFilters(update: (params: URLSearchParams) => void) {
    setSearchParams((prev) => {
      update(prev);
      prev.delete("page");
      return prev;
    });
  }

  function toggle(key: FilterKey, value: string) {
    updateFilters((params) => {
      const values = readList(params, key);
      const next = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];

      if (next.length > 0) params.set(key, next.join(","));
      else params.delete(key);
    });
  }

  function setDate(value: string) {
    updateFilters((params) => params.set("date", value));
  }

  function clearFilters() {
    updateFilters((params) => FILTER_KEYS.forEach((key) => params.delete(key)));
  }

  return {
    filters: { venues, formats, languages, timeBands, date },
    availableFormats,
    activeCount,
    toggle,
    setDate,
    clearFilters,
  };
}
