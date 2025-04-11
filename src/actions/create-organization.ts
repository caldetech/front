"use server";

import { createOrganization } from "@/http/create-organization";
import type { ErrorProps } from "@/types/error";
import type { OrganizationProps } from "@/types/organization";

export async function createOrganizationAction(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) {
    return {
      error: "Client Error",
      message: "Invalid fields!",
      statusCode: 400,
    };
  }

  return await createOrganization({
    name,
    slug,
  });
}
