import { api } from "../lib/api-client";

export async function getBlingAuthorizeUrl({
  slug,
  token,
}: {
  slug: string;
  token: string | null;
}): Promise<{ url: string }> {
  try {
    const user = await api.post("bling/get-authorize-url", {
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
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
