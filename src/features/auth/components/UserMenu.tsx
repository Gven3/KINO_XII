import { IoIosArrowDown } from "react-icons/io";
import type { User } from "../types";
import { UserAvatar } from "./UserAvatar";
import { useRef, useState } from "react";
import { UserMenuModal } from "./UserMenuModal";
import { useClickOutside } from "@/hooks/useClickOutside";

type UserMenuProps = {
  user: User;
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsOpen(false), isOpen);
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="w-full flex items-center gap-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserAvatar user={user} />
        <span className="text-white text-label-m">{user.username}</span>
        <IoIosArrowDown
          className={`text-white ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-150`}
        />
      </button>
      {isOpen && <UserMenuModal user={user} />}
    </div>
  );
}
