"use server";

import { createOrder } from "@/http/create-order";

export async function createOrderAction({
  slug,
  formData,
  token,
}: {
  slug: string;
  formData: FormData;
  token: string | null;
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
    members,
    commissionPercent,
    memberCommissions,
    customer,
    token,
  });

  return { success: true };
}
