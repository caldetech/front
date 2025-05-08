"use server";

import type { Product, ProductResponse } from "@/schemas/products";
import { api } from "../lib/ky_api-client";

export async function searchProduct({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) {
  try {
    return await api
      .post("bling/search", {
        json: {
          slug,
          query,
        },
      })
      .json<Product[]>();
  } catch (error) {
    console.error(error);
    return [];
  }
}
