import { useQuery } from "@tanstack/react-query";
import { authToken } from "@/lib/authToken";
import { getCurrentUser } from "../api";

export const CURRENT_USER_KEY = ["currentUser"] as const;

export function useCurrentUser() {
  const hasToken = authToken.get() !== null;

  const { data: user = null, isPending } = useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: getCurrentUser,
    enabled: hasToken,
    retry: false,
    staleTime: Infinity,
  });

  return {
    user,
    isLoggedIn: user !== null,
    isLoading: hasToken && isPending,
  };
}
