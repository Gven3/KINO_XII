type IconButtonProps = {
  onClick?: () => void;
  icon: string;
  iconClassName?: string;
};

export function IconButton({ onClick, icon, iconClassName }: IconButtonProps) {
  return (
    <button
      type="button"
      className="size-13.5 rounded-full bg-background/50 flex items-center justify-center border border-white/25 cursor-pointer hover:bg-background/40 transition-colors duration-200"
      onClick={onClick}
    >
      <img src={icon} alt="" className={`size-8 ${iconClassName}`} />
    </button>
  );
}
