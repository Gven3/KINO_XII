import { useMutation } from "@tanstack/react-query";
import { releaseHold } from "../api";

export function useReleaseHold() {
  return useMutation({ mutationFn: releaseHold });
}
