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

  return await createInvite({ email, role, slug });
}
