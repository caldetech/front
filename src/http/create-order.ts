"use server";

import { api } from "../lib/api-client";

export async function createOrder({
  slug,
  customer,
  description,
  type,
  value,
  payment,
  commission,
}: {
  slug: string;
  customer: string;
  description: string;
  type: string;
  value: string;
  payment: string;
  commission: string;
}) {
  console.log({
    slug,
    customer,
    description,
    type,
    value,
    payment,
    commission,
  });
  // try {
  //   await api.post("create/order", {
  //     json: {
  //       slug,
  //       customer,
  //       description,
  //       type,
  //       value,
  //       payment,
  //       commission,
  //     },
  //   });

  //   return {
  //     success: true,
  //     message: "Ordem criada com sucesso!",
  //   };
  // } catch (error) {
  //   console.error(error);

  //   return {
  //     success: false,
  //     message: "Erro ao criar a ordem.",
  //   };
  // }
}
