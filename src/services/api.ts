import { BASE_URL } from "@/lib/constants";
import { ApiResponse } from "@/types/type";

type Method = "POST" | "GET" | "DELETE" | "PUT";

export async function apiRequest<T>(
  method: Method,
  url: string,
  values?: any
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}/${url}`, {
    method,
    body: values ? JSON.stringify(values) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error in request");
  }

  return data;
}
