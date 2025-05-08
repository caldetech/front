import { api } from "../lib/ky_api-client";

export async function passwordRecover({ email }: { email: string }) {
  try {
    const user = await api.post("users/password-recover", {
      json: {
        email,
      },
    });

    return user.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
