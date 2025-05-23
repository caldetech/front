"use server";

import type { CustomerTypes } from "@/enums/customer-types";
import { api } from "../lib/api-client";

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
  token,
}: {
  slug: string;
  customerType: CustomerTypes;
  name: string;
  document?: string;
  address: string;
  mainNumber?: string;
  contactNumber?: string;
  token: string | null;
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
