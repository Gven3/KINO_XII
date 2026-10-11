import { HeroCarousel } from "@/features/films/components/hero/HeroCarousel";
import { ComingSoonSection } from "@/features/films/components/sections/ComingSoonSection";
import { NowPlayingSection } from "@/features/films/components/sections/NowPlayingSection";
import { RecentlyViewedSection } from "@/features/films/components/sections/RecentlyViewedSection";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <RecentlyViewedSection />
      <NowPlayingSection />
      <ComingSoonSection />
    </>
  );
}
