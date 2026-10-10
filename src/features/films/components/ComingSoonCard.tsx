import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useNotifyMe } from "../hooks/useNotifyMe";
import type { Film } from "../types";
import { Tag } from "./Tag";
import bell_icon from "@/assets/icons/bell.svg";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

type ComingSoonCardType = {
  film: Film;
};

export function ComingSoonCard({ film }: ComingSoonCardType) {
  const { mutate: notify } = useNotifyMe();
  const { openAuth } = useAuthModal();
  const { isLoggedIn } = useCurrentUser();
  const runtime = film.runtimeMinutes + " min";

  const handleNotify = () => {
    if (!isLoggedIn) {
      openAuth("login");
      return;
    }
    notify(film.slug);
  };

  return (
    <li className="w-117 h-45 bg-surface rounded-[20px] p-3 flex items-center gap-5 shrink-0">
      <div className="w-1/2 h-full rounded-[14px] overflow-hidden">
        <img src={film.posterUrl} alt="" className="size-full object-cover" />
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-label-s text-primary uppercase">
            IN CINEMAS 2 OCTOBER
          </span>
          <span className="text-label-s text-white">{film.title}</span>
          <span className="text-muted text-body-s">
            {film.genres[0]?.name} · {runtime}
          </span>
          <Tag variant="primary" value={film.ageRating.code} />
        </div>
        <button
          type="button"
          className="w-25 py-1.5 px-3 flex items-center justify-center gap-1 rounded-full border border-muted cursor-pointer hover:bg-white/10 transition-colors duration-200"
          onClick={handleNotify}
        >
          <img src={bell_icon} alt="" />
          <span className="text-label-s text-white">Notify Me</span>
        </button>
      </div>
    </li>
  );
}
