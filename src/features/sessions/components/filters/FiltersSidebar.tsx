import { Checkbox } from "@/components/ui/Checkbox";
import { ErrorState } from "@/components/ui/ErrorState";
import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";
import { getNextDays, toDayOptions } from "@/lib/date";
import { useSessionFilters } from "../../hooks/useSessionFilters";
import { splitTimeBandLabel } from "../../utils";
import { DayPicker } from "../DayPicker";
import { FilterSection } from "./FilterSection";

export function FiltersSidebar() {
  const { data: options, isError, isRefetching, refetch } = useFilterOptions();
  const {
    filters,
    availableFormats,
    activeCount,
    toggle,
    setDate,
    clearFilters,
  } = useSessionFilters();

  if (!options) {
    return (
      <aside className="w-88 shrink-0 self-start">
        {isError ? (
          <ErrorState
            message="We couldn't load the filters."
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        ) : (
          <div
            role="status"
            aria-label="Loading filters"
            className="h-200 animate-pulse rounded-[18px] bg-surface"
          />
        )}
      </aside>
    );
  }

  return (
    <aside className="w-88 shrink-0 sticky top-8 self-start bg-surface rounded-[18px] p-7 flex flex-col">
      <h2 className="text-h2 text-white">Filters</h2>

      <FilterSection title="Venue">
        {options.venues.map((venue) => (
          <Checkbox
            key={venue.id}
            label={venue.name}
            hint={venue.city}
            checked={filters.venues.includes(venue.slug)}
            onChange={() => toggle("venues[]", venue.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Date">
        <DayPicker
          size="sm"
          dates={toDayOptions(getNextDays(7))}
          currentDate={filters.date}
          setCurrentDate={setDate}
        />
      </FilterSection>

      <FilterSection title="Format">
        {availableFormats.map((format) => (
          <Checkbox
            key={format.id}
            label={format.name}
            checked={filters.formats.includes(format.slug)}
            onChange={() => toggle("formats[]", format.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Language">
        {options.languages.map((language) => (
          <Checkbox
            key={language.id}
            label={language.name}
            checked={filters.languages.includes(language.slug)}
            onChange={() => toggle("languages[]", language.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Time of day">
        {options.timeBands.map((timeBand) => {
          const { name, hint } = splitTimeBandLabel(timeBand.label);
          return (
            <Checkbox
              key={timeBand.id}
              label={name}
              hint={hint}
              checked={filters.bands.includes(timeBand.id)}
              onChange={() => toggle("bands[]", timeBand.id)}
            />
          );
        })}
      </FilterSection>

      <div className="pt-7 flex flex-col items-center gap-2">
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-full h-11 rounded-full border border-white/60 text-white text-button cursor-pointer"
          >
            Clear all filters
          </button>
        )}
        <span className="text-muted text-body-s">
          {activeCount} {activeCount === 1 ? "filter" : "filters"} active
        </span>
      </div>
    </aside>
  );
}
