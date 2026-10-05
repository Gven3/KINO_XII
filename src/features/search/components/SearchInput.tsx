import searchIcon from "@/assets/icons/search.svg";
import { IoIosClose } from "react-icons/io";

type SearchInputProps = React.ComponentProps<"input"> & {
  query: string;
  onValueChange: (value: string) => void;
};

export function SearchInput({
  query,
  onValueChange,
  ...props
}: SearchInputProps) {
  const isNotEmpty = query.trim().length > 0;
  return (
    <div className="w-full relative overflow-hidden">
      <input
        {...props}
        type="text"
        value={query}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full h-[41px] pl-8.5 pr-10 text-white text-body-m border border-white/10 rounded-full bg-white/10 backdrop-blur-[14px] outline-none"
      />
      <img
        src={searchIcon}
        alt=""
        className="absolute left-3 top-1/2 transform -translate-y-1/2 size-3.5"
      />
      {isNotEmpty && (
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 size-6 rounded-full bg-white/10 hover:bg-white/20 duration-200 flex justify-center items-center cursor-pointer p-0.5"
          onClick={() => onValueChange("")}
        >
          <IoIosClose className="text-white font-bold size-full" />
        </button>
      )}
    </div>
  );
}
