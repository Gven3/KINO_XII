import { ProfileStatus } from "@/features/auth/components/ui/ProfileStatus";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useFilterOptions } from "@/features/filter-options/hooks/useFilterOptions";
import { AgeEligibility } from "./AgeEligibility";
import { PersonalInfoForm } from "./PersonalInfoForm";

export function PersonalInformation() {
  const { user } = useCurrentUser();
  const { data: options } = useFilterOptions();
  // The venue select needs its options before it can show the saved venue.
  if (!user) return null;
  if (!options) {
    return (
      <div
        role="status"
        aria-label="Loading profile"
        className="max-w-300 h-150 animate-pulse rounded-[18px] bg-surface"
      />
    );
  }

  return (
    <div className="max-w-300 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <ProfileStatus activated={user.profileComplete} />
        {user.age !== null && <AgeEligibility age={user.age} />}
      </div>
      <PersonalInfoForm user={user} venues={options.venues} />
    </div>
  );
}
