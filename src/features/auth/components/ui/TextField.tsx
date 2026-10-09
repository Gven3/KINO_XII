import { useId, type ComponentProps } from "react";
import error_icon from "@/assets/icons/error.svg";
import success_icon from "@/assets/icons/success.svg";

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  type: string;
  error?: string;
  isValid?: boolean;
};

export function TextField({
  label,
  type,
  isValid,
  error,
  ...props
}: TextFieldProps) {
  const inputId = useId();
  const statusIcon = error ? error_icon : isValid ? success_icon : null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor={inputId}
          className={`text-label-s ${error ? "text-primary" : "text-white"}`}
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            type={type}
            className={`w-full h-10 bg-surface rounded-xl px-4 text-label-s outline-none border focus:border-surface-light ${error ? "border-primary text-primary" : "text-muted border-transparent"}`}
            {...props}
          />
          {statusIcon && (
            <img
              src={statusIcon}
              alt=""
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <p className="text-primary text-label-s">{error}</p>
    </div>
  );
}
