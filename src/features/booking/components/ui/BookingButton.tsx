import type { ComponentProps } from "react";

export function BookingButton({
  className = "",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`w-full h-13 rounded-full text-h3 cursor-pointer transition-colors bg-primary text-white disabled:bg-subtle disabled:text-muted disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}
