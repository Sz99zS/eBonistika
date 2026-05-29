export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly path: string,
  ) {
    super(`API ${status} ${statusText} on ${path}`);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  // Для запросов с JSON-телом обязателен Content-Type, иначе ASP.NET не забиндит модель.
  const hasBody = init.body !== undefined && init.body !== null;

  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: {
      Accept: "application/json",
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, path);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

/** POST/PUT с JSON-телом. Возвращает распарсенный ответ (или undefined при 204). */
export function mutate<T>(
  path: string,
  method: "POST" | "PUT" | "PATCH",
  body: unknown,
): Promise<T> {
  return apiFetch<T>(path, { method, body: JSON.stringify(body), cache: "no-store" });
}

/** DELETE. Ожидает 204. */
export function remove(path: string): Promise<void> {
  return apiFetch<void>(path, { method: "DELETE", cache: "no-store" });
}
