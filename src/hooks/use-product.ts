// hooks/useProducts.ts
import useSWR from "swr";
import ky from "ky";

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

const fetcher = (url: string) => ky.get(url).json<Response>();

export const useProducts = (page: number, limit = 5) => {
  const { data, error, isLoading } = useSWR(
    `/api/bling/products?page=${page}&limit=${limit}`,
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
