"use server";

import type { Employee } from "@/schemas/employee";
import { api } from "../lib/ky_api-client";

export async function searchEmployee({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) {
  try {
    const employees = await api
      .post("members/search", {
        json: {
          slug,
          query,
        },
      })
      .json<Employee[]>();

    return employees;
  } catch (error) {
    console.error(error);
    return [];
  }
}
