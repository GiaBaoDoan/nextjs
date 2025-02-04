import { ApiResponse } from "@/types/type";

export class CustomError extends Error {
  status: number;
  payload: {
    message: string;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Custom error");
    this.status = status;
    this.payload = payload;
  }
}

export async function apiRequest<T>(
  method: "POST" | "GET" | "DELETE" | "PUT",
  url: string,
  body?: any
): Promise<ApiResponse<T>> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "Application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(
    `${
      process.env.NODE_ENV
        ? process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_BASE_URL
    }/${url}`,
    {
      ...options,
    }
  );

  const payload = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new CustomError(data);
  }

  return data;
}
