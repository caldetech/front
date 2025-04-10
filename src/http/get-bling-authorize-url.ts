import { api } from "../lib/api-client";

export async function getBlingAuthorizeUrl(): Promise<{ url: string }> {
  try {
    const user = await api.get("bling/get-authorize-url");

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
