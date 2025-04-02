import type { MemberRole } from "@/enums/member-role";

export type Member = {
  id: string;
  organizationId: string;
  role: MemberRole;
  userId: string;
};
