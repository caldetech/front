"use server";

import { api } from "../lib/ky_api-client";

export async function createService({
  slug,
  title,
  description,
  price,
}: {
  slug: string;
  title: string;
  description?: string;
  price: number;
}) {
  try {
    const response = await api.post("services/create", {
      json: {
        slug,
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
