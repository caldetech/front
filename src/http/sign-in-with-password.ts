import { api } from "../lib/api-client";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithPasswordResponse {
  token: string;
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  return await api
    .post("auth/sign-in", {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>();
}
