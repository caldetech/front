"use server";

import type { Product, ProductResponse } from "@/schemas/products";
import { api } from "../lib/api-client";

export async function searchProduct({
  slug,
  query,
  token,
}: {
  slug: string;
  query: string;
  token: string | null;
}) {
  try {
    return await api
      .post("bling/search", {
        json: {
          slug,
          query,
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
      })
      .json<Product[]>();
  } catch (error) {
    console.error(error);
    return [];
  }
}
