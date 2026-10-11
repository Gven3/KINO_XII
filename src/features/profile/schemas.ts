import { z } from "zod";

// The messages match the API's, so client and server errors read the same.

function getMobileNumberError(value: string) {
  const digits = value.replace(/\s/g, "");
  if (!digits) return "Mobile number is required";
  if (!/^\d+$/.test(digits))
    return "Please enter a valid Georgian mobile number (9 digits starting with 5)";
  if (!digits.startsWith("5"))
    return "Georgian mobile numbers must start with 5";
  if (digits.length !== 9) return "Mobile number must be exactly 9 digits";
  return null;
}

function getDateOfBirthError(value: string) {
  if (!value) return "Date of birth is required";

  const birthDate = new Date(`${value}T00:00`);
  const today = new Date();
  if (Number.isNaN(birthDate.getTime()) || birthDate > today)
    return "Please enter a valid date of birth";

  const latestAllowed = new Date(
    today.getFullYear() - 12,
    today.getMonth(),
    today.getDate(),
  );
  if (birthDate > latestAllowed)
    return "You must be at least 12 years old to create an account";
  return null;
}

function issue(getError: (value: string) => string | null) {
  return (value: string, ctx: z.RefinementCtx) => {
    const message = getError(value);
    if (message) ctx.addIssue({ code: "custom", message });
  };
}

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  mobileNumber: z.string().superRefine(issue(getMobileNumberError)),
  dateOfBirth: z.string().superRefine(issue(getDateOfBirthError)),
  preferredVenueId: z.string(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
