export type TicketsTab = "upcoming" | "past";

type TicketsFilterProps = {
  active: TicketsTab;
  counts: Record<TicketsTab, number>;
  onChange: (tab: TicketsTab) => void;
};

const TABS: { id: TicketsTab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

export function TicketsFilter({
  active,
  counts,
  onChange,
}: TicketsFilterProps) {
  return (
    <div className="w-max p-1 flex gap-1 rounded-xl bg-surface">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`px-3 py-2 flex items-center gap-2 rounded-lg text-label-m cursor-pointer transition-colors ${active === id ? "bg-surface-light text-white" : "text-muted hover:text-white"}`}
        >
          {label}
          <span
            className={`text-label-s ${active === id ? "text-white" : "text-subtle"}`}
          >
            {counts[id]}
          </span>
        </button>
      ))}
    </div>
  );
}
