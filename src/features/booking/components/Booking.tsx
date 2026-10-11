import { useSessionDetails } from "../hooks/useSessionDetails";
import { useStoredHold } from "../hooks/useStoredHold";
import { BookingSteps } from "./BookingSteps";

// Waits for the session and any saved hold, so the steps start in the right place.
export function Booking({ sessionId }: { sessionId: number }) {
  const { data: session, isError } = useSessionDetails(sessionId);
  const { data: storedHold, isLoading } = useStoredHold(sessionId);

  if (isError) {
    return (
      <span className="m-auto text-white text-h2">
        This session could not be found.
      </span>
    );
  }

  if (!session || isLoading) {
    return <span className="m-auto text-muted text-body-m">Loading...</span>;
  }

  return <BookingSteps session={session} initialHold={storedHold ?? null} />;
}
