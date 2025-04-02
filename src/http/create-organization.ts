"use server";

import type { createOrganizationProps } from "@/interfaces/create-organization";
import { api } from "./api-client";

export async function createOrganization({
  name,
  slug,
}: createOrganizationProps) {
  try {
    await api.post(`organizations/${slug}/create`, {
      json: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
