"use server";

import { updateOrder } from "@/http/update-order";

export async function updateOrderAction({
  orderId,
  slug,
  formData,
  token,
}: {
  orderId?: string;
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

  const services = JSON.parse(formData.get("services") as string) as {
    id: string;
    title: string;
    price: number;
  }[];

  const customer = JSON.parse(formData.get("customer") as string) as {
    id: string;
    name: string;
  };

  const members = JSON.parse(formData.get("members") as string) as {
    id: string;
    name: string;
  }[];

  const commissionPercent = Number(formData.get("commissionPercent"));

  const showOrder = JSON.parse(formData.get("showOrder") as string);

  const memberCommissions = JSON.parse(
    formData.get("memberCommissions") as string
  ) as { memberId: string; value: number }[];

  if (!slug || !type) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  await updateOrder({
    orderId,
    slug,
    type,
    paymentMethod,
    paymentAmount,
    blingProducts,
    services,
    members,
    commissionPercent,
    memberCommissions,
    customer,
    token,
    showOrder,
  });

  return { success: true };
}
