import { NavLink } from "react-router";
import { useTickets } from "@/features/tickets/hooks/useTickets";

const TABS = [
  { to: "/profile", label: "Personal Information" },
  { to: "/profile/tickets", label: "My Tickets" },
];

export function ProfileTabs() {
  const { upcoming } = useTickets();

  return (
    <nav className="flex gap-9 border-b border-surface-light">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={({ isActive }) =>
            `pb-4 -mb-px flex items-center gap-2 border-b-2 text-body-l transition-colors ${isActive ? "text-white border-primary" : "text-muted border-transparent hover:text-white"}`
          }
        >
          {tab.label}
          {tab.to === "/profile/tickets" && upcoming.length > 0 && (
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-primary text-white text-label-s flex items-center justify-center">
              {upcoming.length}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
