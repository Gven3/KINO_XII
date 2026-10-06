import { IconButton } from "@/components/ui/IconButton";
import arrow from "@/assets/icons/arrow.svg";

type HeroControlsProps = {
  onNext: () => void;
  onPrev: () => void;
};

export function HeroControls({ onNext, onPrev }: HeroControlsProps) {
  return (
    <div className="flex gap-2.5 items-center">
      <IconButton icon={arrow} onClick={onPrev} />
      <IconButton icon={arrow} iconClassName="rotate-180" onClick={onNext} />
    </div>
  );
}
