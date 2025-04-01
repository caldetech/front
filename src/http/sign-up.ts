import { api } from "./api-client";

interface SignUpRequest {
  name: string;
  email: string;
  passwordHash: string;
}

type SignUpResponse = void;

export async function signUp({
  name,
  email,
  passwordHash,
}: SignUpRequest): Promise<SignUpResponse> {
  try {
    const user = await api.post("users/sign-up", {
      json: {
        name,
        email,
        passwordHash,
      },
    });

    return user.json();
  } catch (error) {
    console.log(error);
  }
}
