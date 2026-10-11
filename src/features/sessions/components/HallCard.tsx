import type { Session } from "../types";

type HallCardProps = {
  session: Session;
};

export function HallCard({ session }: HallCardProps) {
  return (
    <div className="w-113 h-33 bg-surface rounded-[18px] p-4">
      <span className="text-label-s text-white">Hall {session.hall.name}</span>
    </div>
  );
}
