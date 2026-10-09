import { useMutation } from "@tanstack/react-query";
import { register } from "@/features/auth/api";
import { useAuthSuccess } from "./useAuthSuccess";

export function useRegister() {
  const handleAuthSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: register,
    onSuccess: handleAuthSuccess,
  });
}
