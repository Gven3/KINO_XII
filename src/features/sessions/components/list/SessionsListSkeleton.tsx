const SKELETON_GROUPS = 3;
const SKELETON_CARDS = 4;

export function SessionsListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading sessions"
      className="flex flex-col gap-9"
    >
      {Array.from({ length: SKELETON_GROUPS }, (_, group) => (
        <div key={group} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-22 animate-pulse rounded-md bg-surface" />
            <div className="h-6 w-56 animate-pulse rounded-md bg-surface" />
          </div>
          <div className="flex gap-3.5">
            {Array.from({ length: SKELETON_CARDS }, (_, card) => (
              <div
                key={card}
                className="w-63 h-28 animate-pulse rounded-xl bg-surface"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
