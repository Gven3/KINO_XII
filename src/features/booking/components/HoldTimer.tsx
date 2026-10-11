import { useEffect, useState } from "react";
import { formatCountdown } from "../utils";

export function HoldTimer({ expiresAt }: { expiresAt: string }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const secondsLeft = Math.max(
    0,
    Math.ceil((Date.parse(expiresAt) - now) / 1000),
  );

  return (
    <div className="px-5 py-2 rounded-xl bg-surface flex flex-col items-center">
      <span className="text-muted text-label-s uppercase">Seats held</span>
      <span className="text-white text-h3">{formatCountdown(secondsLeft)}</span>
    </div>
  );
}
