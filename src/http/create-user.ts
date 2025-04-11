import { CreateUserProps } from "@/types/create-user";
import { api } from "../lib/api-client";

export async function createUser({
  name,
  email,
  tokenId,
  password,
  inviteId,
}: CreateUserProps) {
  try {
    const user = await api.post("users/register", {
      json: {
        name,
        email,
        password,
        inviteId,
        tokenId,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
