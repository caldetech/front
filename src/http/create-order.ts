"use server";

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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/create`;

  const requestBody = JSON.stringify({
    slug,
    type,
    paymentMethod,
    paymentAmount,
    blingProducts,
    members,
    commissionPercent,
    memberCommissions,
    customer,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Envia as credenciais (cookies) com a requisição
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar ordem: ${response.statusText}`);
    }

    return {
      success: true,
      message: "Ordem criada com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar ordem:", error);

    return {
      success: false,
      message: "Erro ao criar a ordem.",
    };
  }
}
