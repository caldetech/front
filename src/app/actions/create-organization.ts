"use server";

import { createOrganization } from "@/http/create-organization";

export async function createOrganizationAction(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  await createOrganization({
    name,
    slug,
  });
}
