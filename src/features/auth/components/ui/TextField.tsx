import { useId, type ComponentProps, type ReactNode } from "react";
import error_icon from "@/assets/icons/error.svg";
import success_icon from "@/assets/icons/success.svg";

type FieldSize = "m" | "l";

const SIZE_STYLES: Record<
  FieldSize,
  { label: string; input: string; text: string }
> = {
  m: {
    label: "text-label-s",
    input: "h-10 text-label-s placeholder:text-subtle",
    text: "text-muted",
  },
  l: {
    label: "text-label-m",
    input: "h-13 text-label-m placeholder:text-subtle",
    text: "text-white",
  },
};

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  type: string;
  error?: string;
  isValid?: boolean;
  fieldSize?: FieldSize;
  hint?: string;
  endIcon?: ReactNode;
};

export function TextField({
  label,
  type,
  isValid,
  error,
  fieldSize = "m",
  hint,
  endIcon,
  ...props
}: TextFieldProps) {
  const inputId = useId();
  const statusIcon = error ? error_icon : isValid ? success_icon : null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor={inputId}
          className={`${SIZE_STYLES[fieldSize].label} ${error ? "text-primary" : "text-white"}`}
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            type={type}
            className={`w-full bg-surface rounded-xl px-4 outline-none disabled:text-muted border focus:border-surface-light ${SIZE_STYLES[fieldSize].input} ${error ? "border-primary text-primary" : `border-transparent ${SIZE_STYLES[fieldSize].text}`}`}
            {...props}
          />
          {endIcon ? (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
              {endIcon}
            </span>
          ) : (
            statusIcon && (
              <img
                src={statusIcon}
                alt=""
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            )
          )}
        </div>
      </div>
      <p
        className={
          error ? "text-primary text-label-s" : "text-muted text-body-m"
        }
      >
        {error ?? hint}
      </p>
    </div>
  );
}
