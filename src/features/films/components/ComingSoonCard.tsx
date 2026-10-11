import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useNotifyMe } from "../hooks/useNotifyMe";
import type { Film } from "../types";
import { Tag } from "./Tag";
import bell_icon from "@/assets/icons/bell.svg";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Link } from "react-router";
import { formatLongDate } from "@/lib/date";
import { pendingAuthAction } from "@/features/auth/pendingAction";

type ComingSoonCardType = {
  film: Film;
};

export function ComingSoonCard({ film }: ComingSoonCardType) {
  const { mutate: notify, isPending, isSuccess, isError } = useNotifyMe();
  const { openAuth } = useAuthModal();
  const { isLoggedIn } = useCurrentUser();
  const runtime = film.runtimeMinutes + " min";
  const isNotified = film.isNotified || isSuccess;
  const notifyLabel = isPending
    ? "Sending..."
    : isNotified
      ? "Notified"
      : isError
        ? "Try again"
        : "Notify Me";

  const handleNotify = () => {
    if (!isLoggedIn) {
      pendingAuthAction.set(() => notify(film.slug));
      openAuth("login");
      return;
    }
    notify(film.slug);
  };

  return (
    <li className="relative w-117 h-45 bg-surface rounded-[20px] p-3 flex items-center gap-5 shrink-0 border border-transparent hover:border-white/20 transition-colors duration-200">
      {/* Whole-card link, kept beside the Notify button rather than around it. */}
      <Link
        to={`/movie/${film.slug}`}
        aria-label={film.title}
        className="absolute inset-0 rounded-[20px]"
      />
      <div className="w-1/2 h-full rounded-[14px] overflow-hidden">
        <img src={film.posterUrl} alt="" className="size-full object-cover" />
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-label-s text-primary uppercase">
            In cinemas {formatLongDate(film.releaseDate)}
          </span>
          <span className="text-label-s text-white">{film.title}</span>
          <span className="text-muted text-body-s">
            {film.genres[0]?.name} · {runtime}
          </span>
          <Tag variant="primary" value={film.ageRating.code} />
        </div>
        <button
          type="button"
          className="relative z-10 min-w-25 w-max py-1.5 px-3 flex items-center justify-center gap-1 rounded-full border border-muted cursor-pointer hover:bg-white/10 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          onClick={handleNotify}
          disabled={isPending || isNotified}
        >
          <img src={bell_icon} alt="" />
          <span className="text-label-s text-white">{notifyLabel}</span>
        </button>
      </div>
    </li>
  );
}
