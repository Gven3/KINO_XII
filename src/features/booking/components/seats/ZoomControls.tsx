import type { ReactNode } from "react";
import { LuMinus, LuPlus, LuScan } from "react-icons/lu";
import { useControls } from "react-zoom-pan-pinch";

function ZoomButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="size-9 flex items-center justify-center rounded-full bg-surface-light text-white cursor-pointer transition-colors hover:bg-subtle"
    >
      {children}
    </button>
  );
}

export function ZoomControls() {
  const { zoomIn, zoomOut, fitToView } = useControls();

  return (
    <div className="absolute right-3 bottom-3 flex flex-col gap-2">
      <ZoomButton label="Zoom in" onClick={() => zoomIn()}>
        <LuPlus className="size-4" />
      </ZoomButton>
      <ZoomButton label="Zoom out" onClick={() => zoomOut()}>
        <LuMinus className="size-4" />
      </ZoomButton>
      <ZoomButton label="Fit hall" onClick={() => fitToView()}>
        <LuScan className="size-4" />
      </ZoomButton>
    </div>
  );
}
