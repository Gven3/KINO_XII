import { Link } from "react-router";
type MenuModalButtonProps = {
  iconSrc: string;
  label: string;
  type: "default" | "logout";
  onClick?: () => void;
};
export default function MenuModalButton({
  iconSrc,
  label,
  type,
  onClick,
}: MenuModalButtonProps) {
  return (
    <Link
      to={"/"}
      className="w-full py-3 px-5 flex gap-2 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      <img src={iconSrc} alt="" />
      <span
        className={`${type === "logout" ? "text-primary" : "text-white"} text-label-m`}
      >
        {label}
      </span>
    </Link>
  );
}
