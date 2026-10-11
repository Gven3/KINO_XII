import { z } from "zod";

const withoutSpaces = (value: string) => value.replace(/\s/g, "");

function isFutureExpiry(value: string) {
  const [month = 0, year = 0] = value.split("/").map(Number);
  // Day 1 of the month after expiry, so the card works until its month ends.
  return new Date(2000 + year, month) > new Date();
}

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters"),
  email: z.email("Enter a valid email"),
  mobileNumber: z
    .string()
    .refine(
      (value) => /^5\d{8}$/.test(withoutSpaces(value)),
      "Enter a Georgian mobile number, e.g. 555 123 456",
    ),
  cardNumber: z
    .string()
    .refine(
      (value) => /^\d{16}$/.test(withoutSpaces(value)),
      "Card number must be 16 digits",
    ),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
    .refine(isFutureExpiry, "Card has expired"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
