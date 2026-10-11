export function FilmCardSkeleton() {
  return (
    <li
      aria-hidden
      className="w-65 h-113 shrink-0 p-3 flex flex-col gap-2.5 rounded-[20px] bg-surface"
    >
      <div className="h-75 animate-pulse rounded-[14px] bg-surface-light" />
      <div className="h-5 w-3/4 animate-pulse rounded-md bg-surface-light" />
      <div className="h-4 w-1/2 animate-pulse rounded-md bg-surface-light" />
      <div className="mt-auto h-10 animate-pulse rounded-full bg-surface-light" />
    </li>
  );
}
