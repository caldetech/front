"use server";

import { api } from "../lib/api-client";

export async function createOrganization({
  name,
  slug,
}: {
  name: string;
  slug: string;
}): Promise<void> {
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
