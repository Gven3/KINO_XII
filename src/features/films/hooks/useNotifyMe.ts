// useNotifyMe.ts
import { useMutation } from "@tanstack/react-query";
import { notifyMe } from "../api";

export function useNotifyMe() {
  return useMutation({ mutationFn: notifyMe });
}
