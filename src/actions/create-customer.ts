"use server";

import type { CustomerTypes } from "@/enums/customer-types";
import { createCustomer } from "@/http/create-customer";

export async function createCustomerAction({
  slug,
  formData,
}: {
  slug: string;
  formData: FormData;
}) {
  const customerType = formData.get("customerType") as CustomerTypes;
  const name = formData.get("name") as string;
  const document = formData.get("document")
    ? (formData.get("document") as string)
    : undefined;
  const address = formData.get("address") as string;
  const mainNumber = formData.get("mainNumber")
    ? (formData.get("mainNumber") as string)
    : undefined;
  const contactNumber = formData.get("contactNumber")
    ? (formData.get("contactNumber") as string)
    : undefined;

  if (!slug || !customerType || !name || !address) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  await createCustomer({
    slug,
    customerType,
    name,
    document,
    address,
    mainNumber,
    contactNumber,
  });
}
