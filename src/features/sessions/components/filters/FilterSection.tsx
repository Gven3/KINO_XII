import type { ReactNode } from "react";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
};

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="flex flex-col gap-4 py-7 border-b border-surface-light">
      <span className="text-muted text-overline uppercase">{title}</span>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}
