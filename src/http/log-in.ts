import { api } from "@/lib/api-client";

export async function LogIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ message: string }> {
  const response = await api("auth/log-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response;
}
