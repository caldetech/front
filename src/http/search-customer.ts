"use server";

import { api } from "../lib/api-client";

interface getCustomerProps {
  slug?: string;
  query: string;
}

export async function searchCustomer({
  slug = "caldetech",
  query,
}: getCustomerProps) {
  try {
    const result = await api.post(`organizations/${slug}/customers/search`, {
      json: {
        query,
      },
    });

    return result.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao obter o cliente.",
    };
  }
}
