import { useSearchParams } from "react-router";
import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";
import { toIsoDate } from "@/lib/date";

export type FilterKey = "venues[]" | "formats[]" | "languages[]" | "bands[]";

const FILTER_KEYS: FilterKey[] = [
  "venues[]",
  "formats[]",
  "languages[]",
  "bands[]",
];

function setList(params: URLSearchParams, key: FilterKey, values: string[]) {
  params.delete(key);
  values.forEach((value) => params.append(key, value));
}

export function useSessionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: options } = useFilterOptions();

  // With no venue selected every format is available,
  // otherwise only the formats the selected venues can show.
  function getAvailableFormats(venueSlugs: string[]) {
    const selectedVenues =
      options?.venues.filter((venue) => venueSlugs.includes(venue.slug)) ?? [];

    if (selectedVenues.length === 0) return options?.formats ?? [];

    return (
      options?.formats.filter((format) =>
        selectedVenues.some((venue) =>
          venue.formats.some((f) => f.id === format.id),
        ),
      ) ?? []
    );
  }

  const venues = searchParams.getAll("venues[]");
  const availableFormats = getAvailableFormats(venues);
  const formats = searchParams
    .getAll("formats[]")
    .filter((slug) => availableFormats.some((format) => format.slug === slug));
  const languages = searchParams.getAll("languages[]");
  const bands = searchParams.getAll("bands[]");
  const date = searchParams.get("date") ?? toIsoDate(new Date());
  const sort = searchParams.get("sort") ?? "time_asc";
  const page = Number(searchParams.get("page") ?? 1);

  const activeCount =
    venues.length + formats.length + languages.length + bands.length;

  // Every filter or sort change goes back to page 1, so nobody lands on an empty page.
  function updateFilters(update: (params: URLSearchParams) => void) {
    setSearchParams((prev) => {
      update(prev);
      prev.delete("page");
      return prev;
    });
  }

  function toggle(key: FilterKey, value: string) {
    updateFilters((params) => {
      const values = params.getAll(key);
      const next = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      setList(params, key, next);

      if (key === "venues[]") {
        const allowed = getAvailableFormats(next);
        setList(
          params,
          "formats[]",
          params
            .getAll("formats[]")
            .filter((slug) => allowed.some((format) => format.slug === slug)),
        );
      }
    });
  }

  function setDate(value: string) {
    updateFilters((params) => params.set("date", value));
  }

  function setSort(value: string) {
    updateFilters((params) => params.set("sort", value));
  }

  function clearFilters() {
    updateFilters((params) => FILTER_KEYS.forEach((key) => params.delete(key)));
  }

  function setPage(value: number) {
    setSearchParams((prev) => {
      if (value === 1) prev.delete("page");
      else prev.set("page", String(value));
      return prev;
    });
    window.scrollTo({ top: 0 });
  }

  return {
    searchParams,
    filters: { venues, formats, languages, bands, date, sort, page },
    availableFormats,
    activeCount,
    toggle,
    setDate,
    setSort,
    clearFilters,
    setPage,
  };
}
