import type { UserProfileProps } from "@/types/user-profile";
import { api } from "../lib/api-client";

export async function getProfile() {
  return await api.get("auth/profile").json<UserProfileProps>();
}
