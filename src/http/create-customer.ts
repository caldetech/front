"use server"

import { api } from "./api-client";

interface createCustomerProps {
  slug?: string
  customerType: string
  name: string
  document?: string
  address: string
  mainNumber?: string
  contactNumber?: string
}

export async function createCustomer({ slug = "caldetech", customerType, name, document, address, mainNumber, contactNumber }: createCustomerProps) {
  try {
    await api.post(`organizations/${slug}/customers`, {
      json: {
        customerType, 
        name, 
        document, 
        address, 
        mainNumber, 
        contactNumber
      }
    })

    return {
      success: true,
      message: "Cliente criado com sucesso!"
    }
  } catch(error) {
    console.error(error)

    return {
      success: false,
      message: "Erro ao criar o cliente."
    }
  }
}  