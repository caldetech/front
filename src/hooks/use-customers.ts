import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Customer = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Customer[];
  page: {
    total: number;
  };
};

export const useCustomers = (page: number, limit = 5, slug: string) => {
  const { data, error, isLoading } = useSWR<Response>(
    `customers/all?slug=${slug}&page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    currentPage: page,
    data: data?.data || [],
    total: data?.data.length || 0,
    error,
    isLoading,
  };
};
