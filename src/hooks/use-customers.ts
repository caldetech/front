import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

// Definindo o tipo Customer para ser utilizado no Response
type Customer = {
  id: string;
  [key: string]: unknown;
};

type Response = {
  data: Customer[];
  page: {
    total: number; // Total de clientes no banco de dados
  };
};

export const useCustomers = (
  page: number, // Página atual
  limit = 5, // Itens por página (padrão 5)
  slug: string, // Slug da organização ou outra informação necessária
  token: string | null // Token de autorização
) => {
  // Verifica se a requisição deve ser feita
  const shouldFetch = !!token && !!slug;

  // Fazendo a requisição com SWR
  const { data, error, isLoading, mutate } = useSWR<Response>(
    shouldFetch
      ? [`customers/all?slug=${slug}&page=${page}&limit=${limit}`, token] // URL com os parâmetros de paginação
      : null,
    async ([url, token]: [string, string]) => {
      const response = await fetcher(url, token);
      return (await response.json()) as Response; // Retorna os dados da resposta
    }
  );

  // Calcular o total de páginas com base no total de registros e limite por página
  const totalPages = data ? Math.ceil(data.page.total / limit) : 1;

  return {
    currentPage: page,
    data: data?.data || [], // Dados de clientes
    total: data?.page.total || 0, // Total de clientes no banco de dados
    totalPages, // Total de páginas para a paginação
    error,
    isLoading,
    mutate,
  };
};
