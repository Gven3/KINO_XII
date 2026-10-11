import { NavLink } from "react-router";

const TABS = [
  { to: "/profile", label: "Personal Information" },
  { to: "/profile/tickets", label: "My Tickets" },
];

export function ProfileTabs() {
  return (
    <nav className="flex gap-9 border-b border-surface-light">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={({ isActive }) =>
            `pb-4 -mb-px border-b-2 text-body-l transition-colors ${isActive ? "text-white border-primary" : "text-muted border-transparent hover:text-white"}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
