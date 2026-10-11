export function HeroSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading featured films"
      className="h-190 px-17 pb-45 flex flex-col justify-end gap-4 bg-surface"
    >
      <div className="h-7 w-40 animate-pulse rounded-full bg-surface-light" />
      <div className="h-12 w-145 animate-pulse rounded-md bg-surface-light" />
      <div className="h-14 w-145 animate-pulse rounded-md bg-surface-light" />
      <div className="h-11 w-80 animate-pulse rounded-full bg-surface-light" />
    </section>
  );
}
