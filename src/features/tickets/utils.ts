import type { Order } from "@/features/booking/types";
import { formatShortDayDate, parseDate, toIsoDate } from "@/lib/date";

// Display only: the Refund button itself is driven by order.isRefundable.
const REFUND_CUTOFF_HOURS = 2;

// "14:30, Tue 15 Sep". Built from the session's own date and time, which are
// the cinema's local wall clock.
function formatRefundCutoff({ date, time }: Order["session"]) {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const cutoff = parseDate(date);
  cutoff.setHours(hours - REFUND_CUTOFF_HOURS, minutes);

  const clock = `${String(cutoff.getHours()).padStart(2, "0")}:${String(cutoff.getMinutes()).padStart(2, "0")}`;
  return `${clock}, ${formatShortDayDate(toIsoDate(cutoff))}`;
}

// The line under the Refund button: when it closes, or why it is disabled.
export function getRefundNote(order: Order) {
  if (order.status === "refunded" && order.refundedAt) {
    return `Refunded on ${formatShortDayDate(toIsoDate(new Date(order.refundedAt)))}`;
  }
  if (!order.isUpcoming) return "This session has already run";
  if (order.isRefundable) {
    return `Refundable until ${formatRefundCutoff(order.session)}`;
  }
  return `Refunds closed at ${formatRefundCutoff(order.session)}, ${REFUND_CUTOFF_HOURS} hours before the session`;
}
