import { CreateUserProps } from "@/types/create-user";
import { api } from "../lib/api-client";

export async function createUser({ name, email, password }: CreateUserProps) {
  try {
    const user = await api.post("users/register", {
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
