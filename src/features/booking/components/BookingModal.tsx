import { useEffect, useRef } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { holdStorage } from "../holdStorage";
import { useBookingModal } from "../hooks/useBookingModal";
import { useReleaseHold } from "../hooks/useReleaseHold";
import { Booking } from "./Booking";

export function BookingModal() {
  const { sessionId, closeBooking } = useBookingModal();
  const { user, isLoading } = useCurrentUser();
  const { openAuth } = useAuthModal();
  const { mutate: releaseHold } = useReleaseHold();
  const promptedFor = useRef<number | null>(null);
  const previousId = useRef(sessionId);

  // Booking needs an account: guests get the login modal first.
  useEffect(() => {
    if (sessionId === null || isLoading || user) return;
    if (promptedFor.current === sessionId) return;
    promptedFor.current = sessionId;
    openAuth("login");
  }, [sessionId, isLoading, user, openAuth]);

  // Closing (button, Esc, backdrop or browser Back) drops ?session.
  // Release the hold then, so the seats go straight back on the map.
  useEffect(() => {
    const closedId = previousId.current;
    previousId.current = sessionId;
    if (closedId === null || closedId === sessionId) return;

    const holdId = holdStorage.get(closedId);
    if (!holdId) return;
    holdStorage.clear(closedId);
    releaseHold(holdId);
  }, [sessionId, releaseHold]);

  return (
    <Dialog isOpen={sessionId !== null && user !== null} onClose={closeBooking}>
      <div className="w-368 max-w-[calc(100vw-48px)] h-200 max-h-[calc(100dvh-48px)] p-10 flex flex-col bg-background rounded-[32px] border border-surface-light">
        {sessionId !== null && (
          <Booking key={sessionId} sessionId={sessionId} />
        )}
      </div>
    </Dialog>
  );
}
