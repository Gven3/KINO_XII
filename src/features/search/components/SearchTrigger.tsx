import searchIcon from "@/assets/icons/search.svg";
import type { ComponentProps } from "react";

type SearchTriggerProps = ComponentProps<"button"> & {
  onClick?: () => void;
};
export function SearchTrigger({ onClick, ...props }: SearchTriggerProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className="w-95 h-[41px] bg-white/10 rounded-full px-3 flex items-center gap-0.5 cursor-pointer border border-transparent transition-colors duration-200 hover:border-white/10"
      onClick={onClick}
      {...props}
    >
      <img src={searchIcon} alt="" className="w-3.5 h-3.5" />
      <span className="text-white text-body-m">
        Search films and live events
      </span>
    </button>
  );
}
