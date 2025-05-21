"use server";

import { api } from "../lib/api-client";

export async function createOrder({
  slug,
  type,
  paymentMethod,
  paymentAmount,
  blingProducts,
  service,
  note,
  members,
  memberCommissions,
  customer,
  token,
  showOrder,
  date,
}: {
  slug: string;
  type: string;
  paymentMethod: string;
  paymentAmount: number;
  blingProducts: {
    id: string;
    nome: string;
    preco: number;
    precoCusto: number;
    quantity: number;
  }[];
  service: string;
  note: string | undefined;
  members: { id: string; name: string }[];
  memberCommissions: { memberId: string; value: number }[];
  customer: { id: string; name: string };
  token: string | null;
  showOrder: boolean;
  date: string;
}) {
  try {
    await api.post("orders/create", {
      json: {
        slug,
        type,
        paymentMethod,
        paymentAmount,
        blingProducts,
        service,
        note,
        members,
        memberCommissions,
        customer,
        token,
        showOrder,
        date,
      },
      hooks: {
        beforeRequest: [
          (request) => {
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
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
