"use server"

import { createProduct } from "@/http/create-product"
import { parseBRL } from "@/lib/currency" 

export async function createOrderAction(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') ? formData.get('description') as string : undefined
  const costPrice = parseBRL(formData.get('costPrice') as string)
  const salesPrice = parseBRL(formData.get('salesPrice') as string)
  const stock =  parseInt(formData.get('stock') as string)

  if (!title || !costPrice || !salesPrice || !stock) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!"
    }
  }

  const result = await createProduct({ title, description, costPrice, salesPrice, stock })

  return result
}  