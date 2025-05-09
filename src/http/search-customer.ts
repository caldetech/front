"use server";

import type { Customer } from "@/schemas/customer";
import { api } from "../lib/api-client";

export async function searchCustomer({
  slug,
  query,
  token,
}: {
  slug: string;
  query: string;
  token: string | null;
}) {
  try {
    const result = await api.post("customers/search", {
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
    });

    return result.json<Customer[]>();
  } catch (error) {
    console.error(error);

    return [];
  }
}
