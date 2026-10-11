import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";

// "16+ or 18+", "12+, 16+ or 18+"
function joinCodes(codes: string[]) {
  if (codes.length < 2) return codes.join("");
  return `${codes.slice(0, -1).join(", ")} or ${codes[codes.length - 1]}`;
}

export function AgeEligibility({ age }: { age: number }) {
  const { data: options } = useFilterOptions();
  const blocked =
    options?.ageRatings
      .filter((rating) => rating.minAge > age)
      .map((rating) => rating.code) ?? [];

  return (
    <p className="w-full p-3 rounded-[10px] bg-surface text-white text-body-m">
      {blocked.length === 0
        ? `You are ${age}, you can buy tickets for all age ratings.`
        : `You are ${age}, you cannot buy tickets for ${joinCodes(blocked)} titles.`}
    </p>
  );
}
