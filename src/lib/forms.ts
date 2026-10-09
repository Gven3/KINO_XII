import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "./apiClient";

type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  const body =
    error instanceof ApiError ? (error.data as ApiErrorBody | null) : null;
  const fieldErrors = body?.errors;

  if (fieldErrors) {
    for (const field in fieldErrors) {
      setError(field as Path<T>, { message: fieldErrors?.[field]?.[0] });
    }
    return;
  }

  setError("root", {
    message: body?.message ?? "Something went wrong. Try again.",
  });
}
