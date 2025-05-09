"use server";

import { createOrganization } from "@/http/create-organization";

export async function createOrganizationAction({
  formData,
  token,
}: {
  formData: FormData;
  token: string | null;
}) {
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
    token,
  });
}
