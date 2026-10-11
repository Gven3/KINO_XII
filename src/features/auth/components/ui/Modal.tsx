import { useEffect, useRef, type ReactNode } from "react";
import close_icon from "@/assets/icons/close.svg";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen && !dialog.open) return dialog.showModal();
    if (!isOpen && dialog.open) return dialog.close();
  }, [isOpen]);

  const handleDialogClose = () => {
    if (isOpen) return onClose();
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleDialogClick}
      className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 m-0 max-w-none bg-transparent p-0 backdrop:bg-background/30 backdrop:backdrop-blur-xs motion-reduce:backdrop-blur-none"
    >
      {isOpen && (
        <div className="relative w-105  flex flex-col gap-6 p-8 bg-background rounded-[28px] border border-surface-light shadow-[0_20px_50px_-10px_rgb(0_0_0/0.2)]">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-8 right-8 cursor-pointer"
          >
            <img src={close_icon} alt="" />
          </button>
          <div className="flex flex-col gap-2">
            <h2 className="text-h2 text-white">{title}</h2>
            <span className="text-label-s text-muted">
              {title === "Log In"
                ? "Welcome back to Kino XII"
                : "Welcome to Kino XII"}
            </span>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
