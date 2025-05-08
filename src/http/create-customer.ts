"use server";

import type { CustomerTypes } from "@/enums/customer-types";

interface createCustomerProps {
  slug?: string;
  customerType: string;
  name: string;
  document?: string;
  address: string;
  mainNumber?: string;
  contactNumber?: string;
}

export async function createCustomer({
  slug,
  customerType,
  name,
  document,
  address,
  mainNumber,
  contactNumber,
}: {
  slug: string;
  customerType: CustomerTypes;
  name: string;
  document?: string;
  address: string;
  mainNumber?: string;
  contactNumber?: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/customers/create`;

  const requestBody = JSON.stringify({
    slug,
    customerType,
    name,
    document,
    address,
    mainNumber,
    contactNumber,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Certificando-se de enviar as credenciais
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar cliente: ${response.statusText}`);
    }

    return {
      success: true,
      message: "Cliente criado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar cliente:", error);

    return {
      success: false,
      message: "Erro ao criar o cliente.",
    };
  }
}
