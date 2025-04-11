import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Product = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Product[];
  page: {
    total: number;
  };
};

export const useProducts = (page: number, limit = 5, slug: string) => {
  const { data, error, isLoading } = useSWR<Response>(
    `bling/get-products?slug=${slug}&page=${page}&limit=${limit}`,
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
