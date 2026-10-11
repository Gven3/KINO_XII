import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CURRENT_USER_KEY } from "@/features/auth/hooks/useCurrentUser";
import { updateProfile } from "../api";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    // The navbar dot and the booking gate read profileComplete from here.
    onSuccess: (user) => queryClient.setQueryData(CURRENT_USER_KEY, user),
  });
}
