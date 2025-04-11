"use server";

import { createProduct } from "@/http/create-product";
import { parseBRL } from "@/lib/currency";

export async function createProductAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description")
    ? (formData.get("description") as string)
    : undefined;
  const costPrice = parseBRL(formData.get("costPrice") as string);
  const salesPrice = parseBRL(formData.get("salesPrice") as string);
  const stock = parseInt(formData.get("stock") as string);

  // console.log({
  //   title,
  //   description,
  //   costPrice,
  //   salesPrice,
  //   stock,
  // });

  if (!title || !costPrice || !salesPrice) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  return await createProduct({
    title,
    description,
    costPrice,
    salesPrice,
    stock,
  });
}
