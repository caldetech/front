import { api } from "@/lib/api-client";

export const fetcher = <T>(url: string): Promise<T> => api.get(url).json();
