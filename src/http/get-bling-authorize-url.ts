import { api } from "../lib/ky_api-client";

export async function getBlingAuthorizeUrl({
  slug,
}: {
  slug: string;
}): Promise<{ url: string }> {
  try {
    const user = await api.post("bling/get-authorize-url", {
      json: {
        slug,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
