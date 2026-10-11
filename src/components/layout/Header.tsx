import { NavLink } from "react-router";
import { Logo } from "./Logo";
import { SearchBar } from "@/features/search/components/SearchBar";
import { Button } from "../ui/Button";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { UserMenu } from "@/features/auth/components/UserMenu";

export function Header() {
  const { openAuth } = useAuthModal();
  const { user, isLoading, isLoggedIn } = useCurrentUser();
  return (
    <header className="absolute inset-x-0 z-10 h-[111px] flex items-center justify-between px-15 bg-linear-to-b from-black/70 to-transparent">
      <div className="flex items-center justify-between gap-9">
        <Logo />
        <nav>
          <ul>
            <li>
              <NavLink to="/sessions" className="text-white text-overline uppercase">
                Sessions
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <SearchBar />
        <div className="flex items-center gap-3">
          {!isLoading &&
            (user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button
                  onClick={() => {
                    openAuth("register");
                  }}
                >
                  Sign up
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    openAuth("login");
                  }}
                >
                  Log in
                </Button>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}
