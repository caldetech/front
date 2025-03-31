"use server"

import { createInvite } from "@/http/create-invite"

export async function createInviteAction(formData: FormData) {
  const email = formData.get('email') as string
  const role = formData.get('role') as string

  if (!email) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!"
    }
  }

  const result = await createInvite({ email, role })

  const inviteLink = `http://localhost:3000/cadastrar`

  if (result.success) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipientEmail: email,
        role,
        inviteLink
      })
    })
  }
} 