import { api } from "./api-client";

interface UserProfileResponse {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  iat: number;
  exp: number;
}

export async function getProfile() {
  return await api.get("auth/profile").json<UserProfileResponse>();
}
