import { ErrorState } from "@/components/ui/ErrorState";
import { ApiError } from "@/lib/apiClient";
import { useSessionDetails } from "../hooks/useSessionDetails";
import { useStoredHold } from "../hooks/useStoredHold";
import { BookingSteps } from "./BookingSteps";

// Waits for the session and any saved hold, so the steps start in the right place.
export function Booking({ sessionId }: { sessionId: number }) {
  const {
    data: session,
    error,
    isRefetching,
    refetch,
  } = useSessionDetails(sessionId);
  const { data: storedHold, isLoading } = useStoredHold(sessionId);

  if (error) {
    if (error instanceof ApiError && error.status === 404) {
      return (
        <span className="m-auto text-white text-h2">
          This session could not be found.
        </span>
      );
    }
    return (
      <div className="m-auto w-120">
        <ErrorState
          message="We couldn't load this session."
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      </div>
    );
  }

  if (!session || isLoading) {
    return <span className="m-auto text-muted text-body-m">Loading...</span>;
  }

  return <BookingSteps session={session} initialHold={storedHold ?? null} />;
}
