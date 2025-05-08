"use server";

import type { OrganizationProps } from "@/types/organization";
import type { ErrorProps } from "@/types/error";

export async function createOrganization({
  name,
  slug,
}: {
  name: string;
  slug: string;
}): Promise<OrganizationProps | ErrorProps> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/create`;

  const requestBody = JSON.stringify({
    name,
    slug,
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
      const errorData = await response.json();
      return errorData as ErrorProps;
    }

    const organization = await response.json();
    return organization as OrganizationProps;
  } catch (error) {
    console.error("Erro ao criar organização:", error);

    return {
      error: "Internal Server Error",
      message: "Erro inesperado",
      statusCode: 500,
    };
  }
}
