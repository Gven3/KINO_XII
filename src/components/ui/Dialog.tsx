import { useEffect, useRef, type ReactNode } from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleDialogClose = () => {
    if (isOpen) onClose();
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleDialogClick}
      className="m-auto max-w-none max-h-none bg-transparent p-0 backdrop:bg-background/30 backdrop:backdrop-blur-xs motion-reduce:backdrop-blur-none"
    >
      {isOpen && children}
    </dialog>
  );
}
