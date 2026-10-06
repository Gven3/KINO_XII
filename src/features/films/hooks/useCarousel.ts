import { useState } from "react";

export function useCarousel(slideCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index: number) => {
    if (slideCount === 0) return;
    setCurrentIndex((index + slideCount) % slideCount);
  };

  const next = () => {
    goTo(currentIndex + 1);
  };

  const prev = () => {
    goTo(currentIndex - 1);
  };

  return { currentIndex, goTo, next, prev };
}
