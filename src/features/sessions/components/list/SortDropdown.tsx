import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";
import arrow from "@/assets/icons/arrow.svg";

type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const { data: options } = useFilterOptions();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const current = options?.sorts.find((sort) => sort.id === value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        <span className="text-muted text-label-s">Sort:</span>
        <span className="text-white text-label-m">{current?.label}</span>
        <img
          src={arrow}
          alt=""
          className={`size-4 transition-transform ${isOpen ? "rotate-90" : "-rotate-90"}`}
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-8 z-10 w-56 p-1.5 bg-surface rounded-xl flex flex-col">
          {options?.sorts.map((sort) => (
            <li key={sort.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(sort.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-lg text-left text-label-m cursor-pointer hover:bg-surface-light ${sort.id === value ? "text-primary" : "text-white"}`}
              >
                {sort.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
