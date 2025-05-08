import { api } from "@/lib/api-client";

// Ajuste do fetcher para usar a função api corretamente
export const fetcher = <T>(url: string): Promise<T> =>
  api(url, { method: "GET" });
