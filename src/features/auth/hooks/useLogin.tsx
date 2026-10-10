import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { useAuthSuccess } from "./useAuthSuccess";

export function useLogin() {
  const handleAuthSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: login,
    onSuccess: handleAuthSuccess,
  });
}
