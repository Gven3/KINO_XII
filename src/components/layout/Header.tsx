import { NavLink } from "react-router";
import { Logo } from "./Logo";
import { SearchBar } from "@/features/search/components/SearchBar";
import { Button } from "../ui/Button";

export function Header() {
  return (
    <header className="absolute inset-x-0 z-10 h-[111px] flex items-center justify-between px-15">
      <div className="flex items-center justify-between gap-9">
        <Logo />
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="text-white text-overline uppercase">
                Sessions
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <SearchBar />
        <div className="flex items-center gap-3">
          <Button>Sign up</Button>
          <Button variant="secondary">Log in</Button>
        </div>
      </div>
    </header>
  );
}
