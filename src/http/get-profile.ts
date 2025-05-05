import type { UserProfileProps } from "@/types/user-profile";
import { api } from "../lib/api-client";
import type { User } from "@/utils/casl/user";

export async function getProfile(slug: string) {
  const userWithProfile = await api
    .post("auth/profile", {
      json: {
        slug,
      },
    })
    .json<User>();

  return userWithProfile;
}
