import type { BlingTokensSchema } from "@/schemas/bling-tokens";
import { api } from "../lib/ky_api-client";
import { HTTPError } from "ky";

export async function getValidAccessToken({ slug }: { slug: string }): Promise<
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
