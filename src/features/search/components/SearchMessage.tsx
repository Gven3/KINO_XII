import { ButtonLink } from "@/components/ui/ButtonLink";

type SearchMessageProps = {
  icon: string;
  title: string;
  description: string;
};

export function SearchMessage({
  icon,
  title,
  description,
}: SearchMessageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="flex size-12 items-center justify-center rounded-full bg-white/10">
        <img src={icon} alt="" className="size-5" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-label-m text-white">{title}</p>
        <p className="text-body-m text-muted">{description}</p>
      </div>
      <ButtonLink to="/sessions">Browse all sessions</ButtonLink>
    </div>
  );
}
