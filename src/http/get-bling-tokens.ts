import { api } from "../lib/api-client";

export async function getBlingTokens({ code }: { code: string }) {
  try {
    const user = await api.post("bling/get-tokens", {
      json: {
        code,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
