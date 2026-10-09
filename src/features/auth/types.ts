export type User = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  preferredVenue: any | null;
  profileComplete: boolean;
};

export type AuthResponse = {
  user: User;
  token: string;
};
