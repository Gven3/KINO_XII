import type { ReactNode } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

type FilmRowProps = {
  title: string;
  seeAllHref?: string;
  // Error or empty message, shown instead of the cards.
  fallback?: ReactNode;
  children: ReactNode;
};
export function FilmRow({
  title,
  seeAllHref,
  fallback,
  children,
}: FilmRowProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      dragFree: true,
      align: "start",
      containScroll: "trimSnaps",
      watchResize: false,
    },
    [WheelGesturesPlugin()],
  );
  return (
    <section
      className={`w-full p-17 flex flex-col gap-6 ${title === "Coming Soon" ? "" : "border-b border-b-surface-light"}`}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-white text-h1 uppercase">{title}</h1>
        {seeAllHref && (
          <Link to={seeAllHref} className="text-primary text-label-m">
            See all
          </Link>
        )}
      </div>

      {fallback ?? (
        <div ref={emblaRef} className="overflow-hidden mask-r-from-90%">
          <ul className="flex gap-4">{children}</ul>
        </div>
      )}
    </section>
  );
}
