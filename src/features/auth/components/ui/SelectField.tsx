import { useId, type ComponentProps } from "react";
import { IoIosArrowDown } from "react-icons/io";

type SelectFieldProps = ComponentProps<"select"> & {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
};

export function SelectField({
  label,
  options,
  error,
  ...props
}: SelectFieldProps) {
  const selectId = useId();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor={selectId}
          className={`text-label-m ${error ? "text-primary" : "text-white"}`}
        >
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            className={`w-full h-13 appearance-none bg-surface rounded-xl px-4 text-label-m outline-none border cursor-pointer focus:border-surface-light ${error ? "border-primary text-primary" : "border-transparent text-white"}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white" />
        </div>
      </div>
      <p className="text-primary text-label-s">{error}</p>
    </div>
  );
}
