import { HeroCarousel } from "@/features/films/components/hero/HeroCarousel";
import { ComingSoonSection } from "@/features/films/components/sections/ComingSoonSection";
import { NowPlayingSection } from "@/features/films/components/sections/NowPlayingSection";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <NowPlayingSection />
      <ComingSoonSection />
    </>
  );
}
