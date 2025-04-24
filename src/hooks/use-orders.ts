import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Order = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Order[];
  page: {
    total: number;
  };
};

export const useOrders = (page: number, limit = 5, slug: string) => {
  const { data, error, isLoading } = useSWR<Response>(
    `orders/all?slug=${slug}&page=${page}&limit=${limit}`,
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
