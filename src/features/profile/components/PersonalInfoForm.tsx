import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuCalendarDays } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/features/auth/components/ui/SelectField";
import { TextField } from "@/features/auth/components/ui/TextField";
import type { User } from "@/features/auth/types";
import type { Venue } from "@/features/venues/types";
import { applyServerErrors } from "@/lib/forms";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { profileSchema, type ProfileValues } from "../schemas";

function toFormValues(user: User): ProfileValues {
  return {
    fullName: user.fullName ?? "",
    mobileNumber: user.mobileNumber ?? "",
    dateOfBirth: user.dateOfBirth ?? "",
    preferredVenueId: user.preferredVenue ? String(user.preferredVenue.id) : "",
  };
}

type PersonalInfoFormProps = {
  user: User;
  venues: Venue[];
};

export function PersonalInfoForm({ user, venues }: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: toFormValues(user),
  });
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const venueOptions = [
    { value: "", label: "No preference" },
    ...venues.map((venue) => ({
      value: String(venue.id),
      label: `${venue.name} · ${venue.city}`,
    })),
  ];

  const onSubmit = async (values: ProfileValues) => {
    try {
      const updated = await updateProfile(values);
      // The saved values become the new baseline, so Save disables again.
      reset(toFormValues(updated));
    } catch (error) {
      applyServerErrors(error, setError);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        fieldSize="l"
        label="Full name"
        type="text"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <TextField
        fieldSize="l"
        label="Email"
        type="email"
        value={user.email}
        disabled
        hint="Set at registration and cannot be changed"
      />
      <TextField
        fieldSize="l"
        label="Mobile number"
        type="tel"
        autoComplete="tel-national"
        placeholder="e.g. 555 123 456"
        error={errors.mobileNumber?.message}
        {...register("mobileNumber")}
      />
      <TextField
        fieldSize="l"
        label="Date of birth"
        type="date"
        autoComplete="bday"
        endIcon={<LuCalendarDays className="size-5" />}
        onClick={(event) => event.currentTarget.showPicker()}
        error={errors.dateOfBirth?.message}
        {...register("dateOfBirth")}
      />
      <SelectField
        label="Preferred Venue (Optional)"
        options={venueOptions}
        error={errors.preferredVenueId?.message}
        {...register("preferredVenueId")}
      />

      {errors.root && (
        <p role="alert" className="text-body-m text-primary">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-max mt-4"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
