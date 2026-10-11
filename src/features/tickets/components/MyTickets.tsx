import { useSearchParams } from "react-router";
import { useTickets } from "../hooks/useTickets";
import { TicketCard } from "./TicketCard";
import { TicketsFilter, type TicketsTab } from "./TicketsFilter";

const EMPTY_MESSAGES: Record<TicketsTab, string> = {
  upcoming: "You have no upcoming tickets.",
  past: "You have no past tickets yet.",
};

export function MyTickets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { upcoming, past, isLoading } = useTickets();
  const tab: TicketsTab =
    searchParams.get("filter") === "past" ? "past" : "upcoming";
  const orders = tab === "past" ? past : upcoming;

  const changeTab = (next: TicketsTab) => {
    setSearchParams((params) => {
      if (next === "past") params.set("filter", "past");
      else params.delete("filter");
      return params;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <TicketsFilter
        active={tab}
        counts={{ upcoming: upcoming.length, past: past.length }}
        onChange={changeTab}
      />
      {isLoading ? (
        <p className="text-muted text-body-l">Loading tickets...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted text-body-l">{EMPTY_MESSAGES[tab]}</p>
      ) : (
        orders.map((order) => <TicketCard key={order.id} order={order} />)
      )}
    </div>
  );
}
