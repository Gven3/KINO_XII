import type { User } from "../types";
import { MenuModalButton } from "./MenuModalButton";
import { ProfileStatus } from "./ui/ProfileStatus";
import { UserAvatar } from "./UserAvatar";
import user_icon from "@/assets/icons/user.svg";
import ticket_icon from "@/assets/icons/ticket.svg";
import logout_icon from "@/assets/icons/logout.svg";
import { useLogout } from "../hooks/useLogout";
import { MenuModalLink } from "./MenuModalLink";

type UserMenuModalProps = {
  user: User;
};

export function UserMenuModal({ user }: UserMenuModalProps) {
  const { mutate: logout, isPending } = useLogout();
  return (
    <div
      className={`w-75 absolute bg-background right-0 top-[120%] flex flex-col rounded-2xl overflow-hidden`}
    >
      <div className="flex flex-col gap-4 px-5 pt-5 pb-1">
        <div className="flex items-center gap-2.5">
          <UserAvatar user={user} />
          <div className="flex flex-col">
            <span className="text-white text-label-m">{user.username}</span>
            <span className="text-muted text-body-s">{user.email}</span>
          </div>
        </div>
        <ProfileStatus activated={user.profileComplete} />
      </div>
      <MenuModalLink iconSrc={user_icon} label="My Profile" />
      <MenuModalLink iconSrc={ticket_icon} label="My Tickets" />
      <div className="py-1 border-t border-t-white/10">
        <MenuModalButton
          iconSrc={logout_icon}
          label="Log out"
          onClick={() => logout()}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
