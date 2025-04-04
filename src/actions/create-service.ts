"use server";

import { createService } from "@/http/create-service";
import { parseBRL } from "@/lib/currency";

export async function createServiceAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description")
    ? (formData.get("description") as string)
    : undefined;
  const price = parseBRL(formData.get("price") as string);

  if (!title || !price) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  return await createService({ title, description, price });
}
