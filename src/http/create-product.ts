"use server";

import { api } from "../lib/ky_api-client";

interface createProductProps {
  slug?: string;
  title: string;
  description?: string;
  costPrice: number;
  salesPrice: number;
  stock: number;
}

export async function createProduct({
  slug = "caldetech",
  title,
  description,
  costPrice,
  salesPrice,
  stock,
}: createProductProps) {
  try {
    await api.post(`organizations/${slug}/products`, {
      json: {
        title,
        description,
        costPrice,
        salesPrice,
        stock,
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
