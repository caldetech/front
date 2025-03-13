import { getProfile } from "@/http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated() {
  return await cookies()
}

export async function auth() {
  const storedCookies = await cookies()

  const token = storedCookies.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
