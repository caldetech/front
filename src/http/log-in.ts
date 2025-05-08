import { api } from "../lib/api-client";
import { HttpHeader } from "fastify/types/utils";

export async function LogIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  message: string;
  tokens: Record<HttpHeader, string | number | string[] | undefined>;
}> {
  const response = api
    .post("auth/log-in", {
      json: {
        email,
        password,
      },
    })
    .json<{
      message: string;
      tokens: Record<HttpHeader, string | number | string[] | undefined>;
    }>();

  return response;
}
