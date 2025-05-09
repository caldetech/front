import type { UserProfileProps } from "@/types/user-profile";
import { api } from "../lib/api-client";
import type { User } from "@/utils/casl/user";

export async function getProfile({
  slug,
  token,
}: {
  slug: string;
  token?: string | null;
}) {
  const userWithProfile = await api
    .post("auth/profile", {
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
    .json<User>();

  return userWithProfile;
}
