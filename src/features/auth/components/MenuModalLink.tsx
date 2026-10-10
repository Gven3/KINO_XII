import { Link } from "react-router";
type MenuModalLinkProps = {
  iconSrc: string;
  label: string;
  onClick?: () => void;
};
export function MenuModalLink({ iconSrc, label, onClick }: MenuModalLinkProps) {
  return (
    <Link
      to={"/"}
      className="w-full py-3 px-5 flex gap-2 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      <img src={iconSrc} alt="" />
      <span className="text-white text-label-m">{label}</span>
    </Link>
  );
}
