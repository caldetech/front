import { CreateUserProps } from "@/types/create-user";
import { api } from "../lib/api-client";

export async function createUser({
  name,
  email,
  tokenId,
  password,
  inviteId,
  token,
}: {
  name: string;
  email: string;
  tokenId?: string;
  password: string;
  inviteId?: string;
  token: string | null;
}) {
  try {
    const user = await api.post("users/register", {
      json: {
        name,
        email,
        password,
        inviteId,
        tokenId,
      },
      hooks: {
        beforeRequest: [
          (request) => {
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
