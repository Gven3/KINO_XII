type MenuModalButtonProps = {
  iconSrc: string;
  label: string;
  onClick?: () => void;
  disabled: boolean;
};

export function MenuModalButton({
  iconSrc,
  label,
  onClick,
  disabled,
}: MenuModalButtonProps) {
  return (
    <button
      className="w-full py-3 px-5 flex gap-2 hover:bg-white/10 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      <img src={iconSrc} alt="" />
      <span className="text-primary text-label-m">{label}</span>
    </button>
  );
}
