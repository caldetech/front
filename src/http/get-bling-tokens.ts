import type { BlingTokensSchema } from "@/schemas/bling-tokens";
import { api } from "../lib/api-client";

export async function getBlingTokens({
  code,
  state,
}: {
  code: string;
  state: string;
}): Promise<BlingTokensSchema> {
  try {
    const user = await api.post("bling/get-tokens", {
      json: {
        code,
        state,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
