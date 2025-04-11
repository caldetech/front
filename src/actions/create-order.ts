"use server";

import { createOrder } from "@/http/create-order";

export async function createOrderAction({
  formData,
  slug,
}: {
  formData: FormData;
  slug: string;
}) {
  const customer = formData.get("customer") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const value = formData.get("value") as string;
  const payment = formData.get("payment") as string;
  const commission = formData.get("commission") as string;

  if (!customer || !description || !type || !value || !payment) {
    return {
      success: false,
      message: "Preencha todos os campos obrigatórios.",
    };
  }

  return await createOrder({
    slug,
    customer,
    description,
    type,
    value,
    payment,
    commission,
  });
}
