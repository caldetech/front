import { api } from "../lib/api-client";

export async function LogIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  return await api
    .post("auth/log-in", {
      json: {
        email,
        password,
      },
    })
    .json<{ token: string }>();
}
