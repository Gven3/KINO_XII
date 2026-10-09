import { IoIosArrowDown } from "react-icons/io";
import type { User } from "../types";
import { UserAvatar } from "./UserAvatar";

type UserMenuProps = {
  user: User;
};

export function UserMenu({ user }: UserMenuProps) {
  return (
    <button type="button" className="flex items-center gap-6 cursor-pointer">
      <UserAvatar user={user} />
      <span className="text-white text-label-m">{user.username}</span>
      <IoIosArrowDown className="text-white" />
    </button>
  );
}
