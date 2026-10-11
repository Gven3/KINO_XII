export function RecentFilmCardSkeleton() {
  return (
    <li
      aria-hidden
      className="w-93 h-24 shrink-0 p-2.5 flex gap-3 rounded-[14px] bg-surface"
    >
      <div className="w-25 h-19 animate-pulse rounded-lg bg-surface-light" />
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-surface-light" />
        <div className="h-3 w-1/2 animate-pulse rounded-md bg-surface-light" />
      </div>
    </li>
  );
}
