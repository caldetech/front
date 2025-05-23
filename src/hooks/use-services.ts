import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Service = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Service[];
  page: {
    total: number;
  };
};

export const useServices = (
  page: number,
  limit = 5,
  slug: string,
  token: string | null
) => {
  const shouldFetch = !!token && !!slug;

  const { data, error, isLoading, mutate } = useSWR<Response>(
    shouldFetch
      ? [`services/all?slug=${slug}&page=${page}&limit=${limit}`, token]
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
