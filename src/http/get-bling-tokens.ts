import type { BlingTokensSchema } from "@/schemas/bling-tokens";
import { api } from "../lib/api-client";

export async function getBlingTokens({
  code,
  state,
  token,
}: {
  code: string;
  state: string;
  token: string | null;
}): Promise<BlingTokensSchema> {
  try {
    const user = await api.post("bling/get-tokens", {
      json: {
        code,
        state,
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
