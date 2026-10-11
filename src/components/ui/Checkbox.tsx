import check_icon from "@/assets/icons/check.svg";

type CheckboxProps = {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
};

export function Checkbox({ label, hint, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`size-4 shrink-0 flex items-center justify-center rounded-sm border transition-colors ${checked ? "bg-primary border-primary" : "border-subtle"}`}
      >
        {checked && <img src={check_icon} alt="" />}
      </span>
      <span className="text-white text-label-m">{label}</span>
      {hint && <span className="text-muted text-body-s">· {hint}</span>}
    </label>
  );
}
