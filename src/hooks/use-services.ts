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

export const useServices = (page: number, limit = 5, slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<Response>(
    `services/all?slug=${slug}&page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    currentPage: page,
    data: data?.data || [],
    total: data?.data.length || 0,
    error,
    isLoading,
    mutate,
  };
};
