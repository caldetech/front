"use server";

import { api } from "../lib/api-client";

export async function createOrder({
  slug,
  type,
  paymentMethod,
  paymentAmount,
  blingProducts,
  members,
  commissionPercent,
  memberCommissions,
  customer,
}: {
  slug: string;
  type: string;
  paymentMethod: string;
  paymentAmount: number;
  blingProducts: { id: string; title: string; quantity: number }[];
  members: { id: string; name: string }[];
  commissionPercent: number;
  memberCommissions: { memberId: string; value: number }[];
  customer: { id: string; name: string };
}) {
  try {
    await api.post("orders/create", {
      json: {
        slug,
        type,
        paymentMethod,
        paymentAmount,
        blingProducts,
        members,
        commissionPercent,
        memberCommissions,
        customer,
      },
    });

    return {
      success: true,
      message: "Ordem criada com sucesso!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao criar a ordem.",
    };
  }
}
