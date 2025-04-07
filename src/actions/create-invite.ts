"use server";

import { createInvite } from "@/http/create-invite";
import type { Role } from "@/schemas/role";

export async function createInviteAction({
  formData,
  slug,
}: {
  formData: FormData;
  slug: string;
}) {
  const email = formData.get("email") as string;
  const role = formData.get("role") as Role;

  if (!email || !role || !slug) {
    return {
      success: false,
      message: "Campos obrigatórios ausentes!",
    };
  }

  const result = await createInvite({ email, role, slug });

  // const inviteLink = `http://localhost:3000/cadastrar`

  // if (result.success) {
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/send-email`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       recipientEmail: email,
  //       role,
  //       inviteLink
  //     })
  //   })
  // }
}
