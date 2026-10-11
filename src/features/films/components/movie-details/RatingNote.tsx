import type { AgeRating } from "../../types";

type RatingNoteProps = {
  ageRating: AgeRating;
};

export function RatingNote({ ageRating }: RatingNoteProps) {
  return (
    <div className="w-full p-3 flex flex-col gap-2 bg-warning/10 rounded-[10px]">
      <span className="text-warning text-label-s uppercase">Rating note</span>
      <div className="flex gap-2">
        <span className="text-warning text-label-s">{ageRating.code}</span>
        <p className="text-warning text-body-s">{ageRating.description}</p>
      </div>
    </div>
  );
}
