import { getProfile } from "@/http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated() {
  return await cookies();
}

export async function auth() {
  const storedCookies = await cookies();

  const token = storedCookies.get("token")?.value;

  if (!token) {
    redirect("/entrar");
  }

  try {
    return await getProfile();
  } catch {}

  redirect("/api/auth/sign-out");
}
