import { apiRequest } from "@/lib/apiClient";
import type { User } from "@/features/auth/types";
import type { ProfileValues } from "./schemas";

export async function updateProfile(values: ProfileValues) {
  const response = await apiRequest<{ data: User }>("/profile", {
    method: "PUT",
    body: {
      fullName: values.fullName,
      mobileNumber: values.mobileNumber,
      dateOfBirth: values.dateOfBirth,
      preferredVenueId: values.preferredVenueId
        ? Number(values.preferredVenueId)
        : null,
    },
  });
  return response.data;
}
