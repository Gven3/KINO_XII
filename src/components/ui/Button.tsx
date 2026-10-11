import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "dark";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-white text-black",
  dark: "bg-surface-light text-white",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`h-[41px] rounded-full text-button py-[13px] px-5.5 cursor-pointer transition-colors disabled:bg-subtle disabled:text-muted disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}
