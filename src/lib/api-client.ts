export const api = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    throw error;
  }
};
