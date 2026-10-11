import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import type { Order } from "@/features/booking/types";
import { getBookingError } from "@/features/booking/utils";
import { useRefundOrder } from "../hooks/useRefundOrder";

type RefundDialogProps = {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
};

export function RefundDialog({ order, isOpen, onClose }: RefundDialogProps) {
  const { mutate: refund, isPending, error, reset } = useRefundOrder();
  const seats = order.tickets.map((ticket) => ticket.seatCode).join(", ");

  const close = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={close}>
      <div className="w-105 p-8 flex flex-col gap-6 bg-background rounded-[28px] border border-surface-light">
        <div className="flex flex-col gap-2">
          <h2 className="text-h2 text-white">Refund this order?</h2>
          <p className="text-muted text-body-m">
            Order #{order.reference}: ₾{order.totalPrice} will be refunded and
            seats {seats} released. This cannot be undone.
          </p>
        </div>

        {/* 422: already refunded or inside the cutoff, the message says which. */}
        {error && (
          <p role="alert" className="text-primary text-body-m">
            {getBookingError(error).message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="dark" onClick={close} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={() => refund(order.reference, { onSuccess: onClose })}
            disabled={isPending}
          >
            {isPending ? "Refunding..." : "Refund"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
