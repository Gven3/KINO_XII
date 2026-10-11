import { useMutation } from "@tanstack/react-query";
import { createHold } from "../api";

export function useCreateHold() {
  return useMutation({ mutationFn: createHold });
}
