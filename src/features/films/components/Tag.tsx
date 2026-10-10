type TagVariant = "primary" | "white";

const VARIANT_STYLES: Record<TagVariant, string> = {
  primary: "bg-primary/10 text-primary",
  white: "bg-white/10 text-white",
};

type TagProps = {
  value: string;
  variant?: TagVariant;
  iconSrc?: string;
};

export function Tag({ value, variant = "white", iconSrc }: TagProps) {
  return (
    <span
      className={`py-1 px-1.5 rounded-full text-label-s flex items-center gap-1 w-max ${VARIANT_STYLES[variant]}`}
    >
      {iconSrc && <img src={iconSrc} alt="" />}
      {value}
    </span>
  );
}
