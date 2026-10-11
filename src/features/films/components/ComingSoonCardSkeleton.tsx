export function ComingSoonCardSkeleton() {
  return (
    <li
      aria-hidden
      className="w-117 h-45 shrink-0 p-3 flex gap-5 rounded-[20px] bg-surface"
    >
      <div className="w-1/2 h-full animate-pulse rounded-[14px] bg-surface-light" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-surface-light" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-surface-light" />
        <div className="mt-auto h-8 w-25 animate-pulse rounded-full bg-surface-light" />
      </div>
    </li>
  );
}
