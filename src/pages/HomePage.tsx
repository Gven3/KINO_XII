import { HeroCarousel } from "@/features/films/components/hero/HeroCarousel";
import { NowPlayingSection } from "@/features/films/components/sections/NowPlayingSection";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <NowPlayingSection />
    </>
  );
}
