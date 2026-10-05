import type { ComponentProps } from "react";
import { Link } from "react-router";

type ButtonLinkProps = ComponentProps<typeof Link>;

export function ButtonLink({ className = "", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full bg-white/10 px-5.5 py-3 text-button text-white transition-colors duration-200 hover:bg-white/20 ${className}`}
      {...props}
    />
  );
}
