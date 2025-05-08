import { api } from "../lib/api-client";

export async function newPassword({
  tokenId,
  password,
}: {
  tokenId: string;
  password: string;
}) {
  try {
    const user = await api.post("users/new-password", {
      json: {
        tokenId,
        password,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
