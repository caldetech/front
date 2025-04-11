import type { BlingTokensSchema } from "@/schemas/bling-tokens";
import { api } from "../lib/api-client";

export async function getValidAccessToken({ slug }: { slug: string }) {
  try {
    const tokens = await api
      .post("bling/get-valid-access-token", {
        json: {
          slug,
        },
      })
      .json<BlingTokensSchema>();

    const { accessToken } = tokens;

    return accessToken;
  } catch (error) {
    console.log(error);
  }
}
