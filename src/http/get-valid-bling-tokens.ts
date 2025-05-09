import type { BlingTokensSchema } from "@/schemas/bling-tokens";
import { api } from "../lib/api-client";
import { HTTPError } from "ky";

export async function getValidAccessToken({
  slug,
  token,
}: {
  slug: string;
  token: string | null;
}): Promise<
  | BlingTokensSchema
  | {
      message: string;
      success: boolean;
    }
  | undefined
> {
  try {
    return await api
      .post("bling/get-valid-access-token", {
        json: {
          slug,
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
      })
      .json<BlingTokensSchema>();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();

      return {
        success: false,
        message: errorResponse.message,
      };
    }
  }
}
