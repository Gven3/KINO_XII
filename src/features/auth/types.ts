import type { Venue } from "@/features/venues/types";

export type User = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  preferredVenue: Venue | null;
  profileComplete: boolean;
};

export type AuthResponse = {
  user: User;
  token: string;
};
