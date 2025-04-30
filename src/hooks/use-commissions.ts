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

export const useCommissions = (page: number, limit = 5, slug: string) => {
  const { data, error, isLoading } = useSWR<Response>(
    `commissions/all?slug=${slug}&page=${page}&limit=${limit}`,
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
