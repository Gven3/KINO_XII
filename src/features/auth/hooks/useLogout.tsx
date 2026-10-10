import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api";
import { authToken } from "@/lib/authToken";
import { CURRENT_USER_KEY } from "./useCurrentUser";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      authToken.clear();
      queryClient.setQueryData(CURRENT_USER_KEY, null);
      queryClient.invalidateQueries();
    },
  });
}
