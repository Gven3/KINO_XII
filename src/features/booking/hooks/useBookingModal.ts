import { useSearchParams } from "react-router";

const SESSION_PARAM = "session";

export function useBookingModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = Number(searchParams.get(SESSION_PARAM));
  const sessionId = Number.isInteger(value) && value > 0 ? value : null;

  const openBooking = (id: number) => {
    setSearchParams((params) => {
      params.set(SESSION_PARAM, String(id));
      return params;
    });
  };

  const closeBooking = () => {
    setSearchParams((params) => {
      params.delete(SESSION_PARAM);
      return params;
    });
  };

  return { sessionId, openBooking, closeBooking };
}
