import type { ErrorProps } from "@/types/error";
import type { OrganizationProps } from "@/types/organization";

export function isOrganization(
  response: ErrorProps | OrganizationProps
): response is OrganizationProps {
  return typeof response === "object" && response !== null && "id" in response;
}
