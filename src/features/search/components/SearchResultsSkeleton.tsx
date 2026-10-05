const SKELETON_ROWS = 3;

export function SearchResultsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading results"
      className="flex flex-col gap-2 overflow-hidden w-full h-full"
    >
      <div className="h-5 animate-pulse rounded-md bg-surface-light" />
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div
          key={index}
          className="h-18 animate-pulse rounded-md bg-surface-light"
        />
      ))}
    </div>
  );
}
