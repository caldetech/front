"use server";

import type { Customer } from "@/schemas/customer";
import { api } from "../lib/api-client";

export async function searchCustomer({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) {
  try {
    const result = await api.post("customers/search", {
      json: {
        slug,
        query,
      },
    });

    return result.json<Customer[]>();
  } catch (error) {
    console.error(error);

    return [];
  }
}
