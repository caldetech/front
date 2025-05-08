"use server";

import type { CustomerTypes } from "@/enums/customer-types";
import { api } from "../lib/ky_api-client";

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
  try {
    await api.post("customers/create", {
      json: {
        slug,
        customerType,
        name,
        document,
        address,
        mainNumber,
        contactNumber,
      },
    });

    return {
      success: true,
      message: "Cliente criado com sucesso!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao criar o cliente.",
    };
  }
}
