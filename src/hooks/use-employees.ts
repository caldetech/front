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

export const useEmployees = (page: number, limit = 5, slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<Response>(
    `users/all?slug=${slug}&page=${page}&limit=${limit}`,
    fetcher
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
