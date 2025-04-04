import { api } from "../lib/api-client";

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  return await api
    .post("auth/sign-in", {
      json: {
        email,
        password,
      },
    })
    .json<{ token: string }>();
}
