import type { User } from "../types";

type UserAvatarProps = {
  user: User;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <span className="relative size-10 bg-surface rounded-lg flex items-center justify-center">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt=""
          className="size-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-white text-label-s">
          {user.username.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`absolute size-2 rounded-full border border-surface -right-0.5 -bottom-0.5 ${user.profileComplete ? "bg-success" : "bg-warning"}`}
      ></span>
    </span>
  );
}
