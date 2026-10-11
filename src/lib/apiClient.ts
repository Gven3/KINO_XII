import { authToken } from "@/lib/authToken";

const API_URL = import.meta.env.VITE_API_URL;

export const UNAUTHORIZED_EVENT = "kinoxii:unauthorized";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, string> | URLSearchParams;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    super(`Request failed with status ${status}`);
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, params, signal }: RequestOptions = {},
): Promise<T> {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  const token = authToken.get();
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined && !isFormData)
    headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_URL}${path}${query}`, {
    method,
    headers,
    signal,
    body:
      body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    // A stored token was rejected: the session expired, so ask to log in again.
    if (response.status === 401 && token) {
      authToken.clear();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    throw new ApiError(response.status, data);
  }

  return data as T;
}
