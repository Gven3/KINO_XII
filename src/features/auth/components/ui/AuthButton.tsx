import type { ReactNode } from "react";

type AuthButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled: boolean;
  children: ReactNode;
};

export function AuthButton({ disabled, children, type }: AuthButtonProps) {
  return (
    <button
      className={`w-full rounded-full text h-10 text-button ${disabled ? "bg-subtle text-muted" : "bg-primary text-white"}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
