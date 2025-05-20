"use server";

import { api } from "../lib/api-client";

export async function updateOrder({
  orderId,
  slug,
  paymentMethod,
  paymentAmount,
  blingProducts,
  service,
  members,
  orderType,
  customer,
  token,
  showOrder,
  date,
  note,
}: {
  orderId?: string;
  slug: string;
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
  orderType: string;
  members: { id: string; name: string }[];
  customer: { id: string; name: string };
  token: string | null;
  showOrder: boolean;
  date: string;
  note: string;
}) {
  try {
    await api.post("orders/update", {
      json: {
        orderId,
        slug,
        paymentMethod,
        paymentAmount,
        blingProducts,
        service,
        members,
        customer,
        showOrder,
        date,
        orderType,
        note,
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
