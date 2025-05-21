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
    (formData.get("paymentAmount") as string) || "0"
  );

  const parseJSON = <T>(value: FormDataEntryValue | null, fallback: T): T => {
    if (!value) return fallback;
    try {
      return JSON.parse(value as string) as T;
    } catch (error) {
      console.error("Erro ao fazer parse do JSON:", error);
      return fallback;
    }
  };

  const blingProducts = parseJSON<
    {
      id: string;
      nome: string;
      preco: number;
      precoCusto: number;
      quantity: number;
    }[]
  >(formData.get("blingProducts"), []);

  const service = parseJSON<string>(formData.get("service"), "");

  const note = parseJSON<string>(formData.get("note"), "");

  const date = parseJSON<string>(formData.get("date"), "");

  const customer = parseJSON<{ id: string; name: string }>(
    formData.get("customer"),
    { id: "", name: "" }
  );

  const members = parseJSON<{ id: string; name: string }[]>(
    formData.get("members"),
    []
  );

  const showOrder = parseJSON<boolean>(formData.get("showOrder"), false);

  const memberCommissions = parseJSON<{ memberId: string; value: number }[]>(
    formData.get("memberCommissions"),
    []
  );

  if (!slug || !type) {
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
