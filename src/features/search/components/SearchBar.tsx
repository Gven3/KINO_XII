import { useEffect, useRef, useState } from "react";
import { SearchTrigger } from "./SearchTrigger";
import { SearchPanel } from "./SearchPanel";

type PanelPosition = {
  top: number;
  right: number;
};

function getPanelPosition(trigger: HTMLElement): PanelPosition {
  const rect = trigger.getBoundingClientRect();
  return { top: rect.top, right: window.innerWidth - rect.right };
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition>({ top: 0, right: 0 });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (triggerRef.current) setPosition(getPanelPosition(triggerRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const openSearch = () => {
    if (triggerRef.current) setPosition(getPanelPosition(triggerRef.current));
    setIsOpen(true);
  };

  const closeSearch = () => {
    setIsOpen(false);
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeSearch();
  };

  return (
    <>
      <SearchTrigger ref={triggerRef} onClick={openSearch} />
      <dialog
        ref={dialogRef}
        aria-label="Search"
        onClose={closeSearch}
        onClick={handleDialogClick}
        style={{ top: position.top, right: position.right }}
        className="left-auto m-0 max-w-none bg-transparent p-0 backdrop:bg-black/20 "
      >
        {isOpen && <SearchPanel />}
      </dialog>
    </>
  );
}
