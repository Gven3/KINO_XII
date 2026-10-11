import type { TicketType } from "@/features/filter-options/types";
import close_icon from "@/assets/icons/close.svg";
import type { SelectedSeat } from "../../types";

type SelectedSeatCardProps = {
  seat: SelectedSeat;
  price: number;
  ticketTypes: TicketType[];
  onTicketTypeChange: (ticketType: string) => void;
  onRemove: () => void;
};

export function SelectedSeatCard({
  seat,
  price,
  ticketTypes,
  onTicketTypeChange,
  onRemove,
}: SelectedSeatCardProps) {
  return (
    <div className="shrink-0 p-4 rounded-[18px] bg-surface flex flex-col gap-3">
      <div className="pb-3 flex items-center justify-between border-b border-surface-light">
        <span className="flex items-center gap-3">
          <span className="text-muted text-body-m">Seat</span>
          <span className="text-white text-label-m">{seat.code}</span>
        </span>
        <span className="flex items-center gap-4">
          <span className="text-white text-label-m">₾{price}</span>
          <button
            type="button"
            aria-label={`Remove seat ${seat.code}`}
            onClick={onRemove}
            className="cursor-pointer opacity-60 hover:opacity-100"
          >
            <img src={close_icon} alt="" />
          </button>
        </span>
      </div>
      <div className="flex gap-2">
        {ticketTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onTicketTypeChange(type.slug)}
            title={type.note ?? undefined}
            className={`flex-1 h-10 rounded-full text-white text-body-m cursor-pointer transition-colors ${seat.ticketType === type.slug ? "bg-primary" : "bg-surface-light"}`}
          >
            {type.name} {Math.round(type.priceRatio * 100)}%
          </button>
        ))}
      </div>
    </div>
  );
}
