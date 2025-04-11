import useSWR from "swr";
import ky from "ky";
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

export const useEmployees = (page: number, limit = 5) => {
  const { data, error, isLoading } = useSWR<Response>(
    `users/all?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    currentPage: page,
    data: data?.data || [],
    total: data?.page?.total || 0,
    error,
    isLoading,
  };
};
