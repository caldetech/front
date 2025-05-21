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

export const useOrders = (
  page: number,
  limit = 5,
  slug: string,
  token: string,
  role: string,
  memberId: string
) => {
  const shouldFetch = !!token && !!slug;

  const { data, error, isLoading, mutate } = useSWR<Response>(
    shouldFetch
      ? [
          `orders/all?slug=${slug}&page=${page}&limit=${limit}&role=${role}&memberId=${memberId}`,
          token,
        ]
      : null,
    async ([url, token]: [string, string]) => {
      const response = await fetcher(url, token);
      return (await response.json()) as Response;
    }
  );

  // Calcular o total de páginas com base no total de registros e limite por página
  const totalPages = data ? Math.ceil(data.page.total / limit) : 1;

  return {
    currentPage: page,
    data: data?.data || [],
    total: data?.data.length || 0,
    totalPages,
    error,
    isLoading,
    mutate,
  };
};
