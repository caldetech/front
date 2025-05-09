"use server";

import { api } from "../lib/api-client";

export async function createService({
  slug,
  title,
  description,
  price,
  token,
}: {
  slug: string;
  title: string;
  description?: string;
  price: number;
  token: string | null;
}) {
  try {
    const response = await api.post("services/create", {
      json: {
        slug,
        title,
        description,
        price,
      },
      hooks: {
        beforeRequest: [
          (request) => {
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
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
