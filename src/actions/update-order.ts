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
  const customer = JSON.parse(formData.get("customer") as string) as {
    id: string;
    name: string;
  };
  const members = JSON.parse(formData.get("members") as string) as {
    id: string;
    name: string;
  }[];
  const showOrder = JSON.parse(formData.get("showOrder") as string);
  const service = JSON.parse(formData.get("service") as string);
  const orderType = JSON.parse(formData.get("orderType") as string);
  const date = JSON.parse(formData.get("date") as string);
  const note = JSON.parse(formData.get("note") as string);

  await updateOrder({
    orderId,
    slug,
    orderType,
    paymentMethod,
    paymentAmount,
    blingProducts,
    service,
    members,
    customer,
    token,
    showOrder,
    date,
    note,
  });

  return { success: true };
}
