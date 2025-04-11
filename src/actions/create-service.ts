"use server";

import { createService } from "@/http/create-service";
import { parseBRL } from "@/lib/currency";

export async function createServiceAction({
  slug,
  formData,
}: {
  slug: string;
  formData: FormData;
}) {
  const title = formData.get("title") as string;
  const description = formData.get("description")
    ? (formData.get("description") as string)
    : undefined;
  const price = parseBRL(formData.get("price") as string);

  if (!slug || !title || !price) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  return await createService({ slug, title, description, price });
}
