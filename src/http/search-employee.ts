"use server";

import type { Employee } from "@/schemas/employee";
import { api } from "../lib/api-client";

export async function searchEmployee({
  slug,
  query,
  token,
}: {
  slug: string;
  query: string;
  token: string | null;
}) {
  try {
    const employees = await api
      .post("members/search", {
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
      .json<Employee[]>();

    return employees;
  } catch (error) {
    console.error(error);
    return [];
  }
}
