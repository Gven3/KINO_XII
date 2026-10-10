import { apiRequest } from "@/lib/apiClient";
import type { LoginValues, RegisterValues } from "./schemas";
import type { AuthResponse, User } from "./types";

export async function register(values: RegisterValues) {
  const formData = new FormData();
  formData.append("username", values.username);
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("password_confirmation", values.password_confirmation);

  if (values.avatar) {
    formData.append("avatar", values.avatar);
  }

  const response = await apiRequest<{ data: AuthResponse }>("/register", {
    method: "POST",
    body: formData,
  });
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiRequest<{ data: User }>("/me");
  return response.data;
}

export function logout() {
  return apiRequest<void>("/logout", { method: "POST" });
}

export async function login(values: LoginValues) {
  const response = await apiRequest<{ data: AuthResponse }>("/login", {
    method: "POST",
    body: values,
  });
  return response.data;
}
