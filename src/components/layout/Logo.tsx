import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/" className="text-h2 text-white flex items-center gap-[6px]">
      KINO <span className="text-primary">XII</span>
    </Link>
  );
}
