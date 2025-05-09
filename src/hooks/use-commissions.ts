import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Commission = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Commission[];
  page: {
    total: number;
  };
};

export const useCommissions = (
  page: number,
  limit = 5,
  slug: string,
  token: string | null
) => {
  const shouldFetch = !!token && !!slug;

  const { data, error, isLoading } = useSWR<Response>(
    shouldFetch
      ? [`commissions/all?slug=${slug}&page=${page}&limit=${limit}`, token]
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
  };
};
