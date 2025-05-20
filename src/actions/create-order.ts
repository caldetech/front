"use server";

import { createOrder } from "@/http/create-order";

export async function createOrderAction({
  slug,
  formData,
  token,
}: {
  slug: string;
  formData: FormData;
  token: string;
}) {
  const type = formData.get("type") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  const paymentAmount = parseFloat(
    formData.get("paymentAmount")
      ? (formData.get("paymentAmount") as string)
      : "0"
  );

  const blingProducts = JSON.parse(formData.get("blingProducts") as string) as {
    id: string;
    nome: string;
    preco: number;
    precoCusto: number;
    quantity: number;
  }[];

  const service = JSON.parse(formData.get("service") as string);

  const note = JSON.parse(formData.get("note") as string);

  const date = JSON.parse(formData.get("date") as string);

  const customer = JSON.parse(formData.get("customer") as string) as {
    id: string;
    name: string;
  };

  const members = JSON.parse(formData.get("members") as string) as {
    id: string;
    name: string;
  }[];

  const showOrder = JSON.parse(formData.get("showOrder") as string);

  const memberCommissions = JSON.parse(
    formData.get("memberCommissions") as string
  ) as { memberId: string; value: number }[];

  if (!slug || !type || !blingProducts.length) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  await createOrder({
    slug,
    type,
    paymentMethod,
    paymentAmount,
    blingProducts,
    service,
    note,
    date,
    members,
    memberCommissions,
    customer,
    token,
    showOrder,
  });

  return { success: true };
}
