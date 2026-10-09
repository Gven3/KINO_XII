import { z } from "zod";

export const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    email: z.email("Enter a valid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    password_confirmation: z.string().min(1, "Confirm your password"),
    avatar: z
      .instanceof(File)
      .refine(
        (file) => ACCEPTED_AVATAR_TYPES.includes(file.type),
        "Upload a JPG, PNG or WEBP image",
      )
      .refine(
        (file) => file.size <= MAX_AVATAR_SIZE,
        "Image must be 2 MB or smaller",
      )
      .nullable(),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
