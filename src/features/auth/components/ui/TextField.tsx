import { useId } from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type: string;
  error?: string;
};

export function TextField({ label, type, error, ...props }: TextFieldProps) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={inputId} className="text-label-s text-white">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className="w-full h-10 bg-surface rounded-xl px-4 text-muted text-label-s outline-none border border-transparent focus:border-surface-light"
        {...props}
      />
      <p className="text-primary text-label-s">{error}</p>
    </div>
  );
}
