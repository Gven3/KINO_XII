import searchIcon from "@/assets/icons/search.svg";

export function SearchTrigger() {
  return (
    <button className="w-95 h-[41px] bg-white/10 rounded-full px-3 py-1.5 flex items-center gap-0.5 cursor-pointer border border-transparent transition-colors duration-200 hover:border-white/10">
      <img src={searchIcon} alt="" className="w-3.5 h-3.5" />
      <span className="text-white text-body-m">
        Search films and live events
      </span>
    </button>
  );
}
