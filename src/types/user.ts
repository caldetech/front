import type { UserStatus } from "@/enums/user-status";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  number: string | null;
  passwordHash: string;
  avatarUrl: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};
