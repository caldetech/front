"use server";

import { api } from "../lib/api-client";

export async function createProduct({
  slug = "caldetech",
  title,
  description,
  costPrice,
  salesPrice,
  stock,
  token,
}: {
  slug?: string;
  title: string;
  description?: string;
  costPrice: number;
  salesPrice: number;
  stock: number;
  token: string | null;
}) {
  try {
    await api.post(`organizations/${slug}/products`, {
      json: {
        title,
        description,
        costPrice,
        salesPrice,
        stock,
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
      message: "Produto criado com sucesso!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao criar o produto.",
    };
  }
}
