import type { MemberRole } from "@/enums/member-role";

export type MemberProps = {
  id: string;
  organizationId: string;
  role: MemberRole;
  userId: string;
};
