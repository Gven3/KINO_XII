import type { ComponentProps } from "react";
import { Link } from "react-router";

type ButtonLinkVariant = "primary" | "ghost";

const VARIANT_STYLES: Record<ButtonLinkVariant, string> = {
  primary: "bg-primary hover:bg-primary/80",
  ghost: "bg-white/10 hover:bg-white/20",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
};

export function ButtonLink({
  variant = "ghost",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-5.5 py-3 text-button text-white transition-colors duration-200 ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}
