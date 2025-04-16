"use server";

import { createOrder } from "@/http/create-order";

export async function createOrderAction({
  slug,
  formData,
}: {
  slug: string;
  formData: FormData;
}) {
  const type = formData.get("type") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  const paymentAmount = parseFloat(
    formData.get("paymentAmount")
      ? (formData.get("paymentAmount") as string)
      : "0"
  );

  const products = JSON.parse(formData.get("products") as string) as {
    id: string;
    title: string;
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

  const commissionPercent = Number(formData.get("commissionPercent"));

  const memberCommissions = JSON.parse(
    formData.get("memberCommissions") as string
  ) as { memberId: string; value: number }[];

  if (!slug || !type || !products.length) {
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
    products,
    members,
    commissionPercent,
    memberCommissions,
    customer,
  });

  return { success: true };
}
