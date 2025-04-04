import type { CreateUserProps } from "@/types/create-user";
import { api } from "../lib/api-client";
import type { UserProps } from "@/types/user";

export async function signUp({
  name,
  email,
  password,
}: CreateUserProps): Promise<UserProps> {
  try {
    const user = await api.post("users/sign-up", {
      json: {
        name,
        email,
        password,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
