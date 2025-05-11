"use server";

import type { Service, ServiceResponse } from "@/schemas/services";
import { api } from "../lib/api-client";

export async function searchService({
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
      .post("services/search", {
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
      .json<Service[]>();
  } catch (error) {
    console.error(error);
    return [];
  }
}
