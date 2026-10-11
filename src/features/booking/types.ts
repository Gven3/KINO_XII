import type { Film } from "@/features/films/types";
import type { Hall, Session } from "@/features/sessions/types";

export type SessionDetails = Session & {
  movie: Omit<Film, "synopsis">;
};

export type SeatState = "available" | "sold" | "held" | "unavailable";

export type Seat = {
  id: number;
  code: string;
  label: string;
  state: SeatState;
  aisleAfter: boolean;
  isMine: boolean;
};

export type SeatRow = {
  label: string;
  seats: Seat[];
};

export type SeatSection = {
  name: string;
  rows: SeatRow[];
};

export type SeatMap = {
  sessionId: number;
  hall: Hall;
  sections: SeatSection[];
};

export type TicketTypeRef = {
  slug: string;
  name: string;
};

export type HeldSeat = {
  seatId: number;
  code: string;
  ticketType: TicketTypeRef;
  price: number;
};

export type SeatHold = {
  holdId: string;
  sessionId: number;
  expiresAt: string;
  secondsRemaining: number;
  isLive: boolean;
  subtotal: number;
  seats: HeldSeat[];
};

export type OrderTicket = {
  id: number;
  seatCode: string;
  ticketType: TicketTypeRef;
  price: number;
};

export type Order = {
  id: number;
  reference: string;
  status: "paid" | "refunded";
  totalPrice: number;
  paidAt: string;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string;
  contact: {
    fullName: string;
    email: string;
    mobileNumber: string;
  };
  session: SessionDetails;
  tickets: OrderTicket[];
};

export type SelectedSeat = {
  seatId: number;
  code: string;
  ticketType: string;
};

export type BookingStep = "seats" | "checkout";
