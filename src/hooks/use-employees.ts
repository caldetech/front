import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Employee = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Employee[];
  page: {
    total: number;
  };
};

export const useEmployees = (
  page: number,
  limit = 5,
  slug: string,
  token: string | null
) => {
  const shouldFetch = !!token && !!slug;

  const { data, error, isLoading, mutate } = useSWR<Response>(
    shouldFetch
      ? [`users/all?slug=${slug}&page=${page}&limit=${limit}`, token]
      : null,
    async ([url, token]: [string, string]) => {
      const response = await fetcher(url, token);
      return (await response.json()) as Response;
    }
  );

  return {
    currentPage: page,
    data: data?.data || [],
    total: data?.page?.total || 0,
    error,
    isLoading,
    mutate,
  };
};
