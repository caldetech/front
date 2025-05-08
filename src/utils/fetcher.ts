import { api } from "@/lib/ky_api-client";

export const fetcher = <T>(url: string): Promise<T> => api.get(url).json();
