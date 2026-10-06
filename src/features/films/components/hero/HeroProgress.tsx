type HeroProgressProps = {
  count: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  onComplete: () => void;
};

export function HeroProgress({
  count,
  currentIndex,
  onSelect,
  onComplete,
}: HeroProgressProps) {
  return (
    <div className="flex flex-1  gap-2">
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === currentIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive}
            className="h-[3px] flex-1 cursor-pointer overflow-hidden rounded-full bg-white"
          >
            {isActive && (
              <span
                onAnimationEnd={onComplete}
                className="block h-full origin-left animate-progress bg-primary motion-reduce:animate-none"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
