"use server"

import { createCustomer } from "@/http/create-customer"

export async function createCustomerAction(formData: FormData) {
  const customerType = formData.get('customerType') as string
  const name = formData.get('name') as string
  const document = formData.get('document') ? formData.get('document') as string : undefined
  const address = formData.get('address') as string
  const mainNumber = formData.get('mainNumber') ? formData.get('mainNumber') as string : undefined
  const contactNumber = formData.get('contactNumber') ? formData.get('contactNumber') as string : undefined

  if (!customerType || !name || !address) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!"
    }
  }

  await createCustomer({ customerType, name, document, address, mainNumber, contactNumber })
} 