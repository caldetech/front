"use server";

import { api } from "../lib/api-client";

interface createServiceProps {
  slug?: string;
  title: string;
  description?: string;
  price: number;
}

export async function createService({
  slug = "caldetech",
  title,
  description,
  price,
}: createServiceProps) {
  try {
    const response = await api.post(`organizations/${slug}/services`, {
      json: {
        title,
        description,
        price,
      },
    });

    return {
      success: true,
      message: "Serviço criado com sucesso!",
      data: response.json(),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao criar o serviço.",
    };
  }
}
