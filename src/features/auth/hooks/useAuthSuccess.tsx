import { useQueryClient } from "@tanstack/react-query";
import { authToken } from "@/lib/authToken";
import type { AuthResponse } from "@/features/auth/types";
import { CURRENT_USER_KEY } from "@/features/auth/hooks/useCurrentUser";

export function useAuthSuccess() {
  const queryClient = useQueryClient();

  return ({ token, user }: AuthResponse) => {
    authToken.set(token);
    queryClient.setQueryData(CURRENT_USER_KEY, user);
    queryClient.invalidateQueries({ queryKey: ["films"] });
  };
}
