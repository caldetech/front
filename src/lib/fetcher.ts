import { api } from "./api-client";

export const fetcher = <T>(url: string): Promise<T> => api.get(url).json();
