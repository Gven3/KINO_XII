import { Link } from "react-router";
type LogoProps = {
  for?: "header" | "footer";
};
export function Logo({ for: variant = "header" }: LogoProps) {
  return (
    <Link
      to="/"
      className={`text-white flex items-center gap-[6px] ${variant === "header" ? "text-h2" : "text-label-m"}`}
    >
      KINO <span className="text-primary">XII</span>
    </Link>
  );
}
