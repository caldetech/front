import type { ErrorProps } from "@/types/error";
import type { OrganizationProps } from "@/types/organization";

export function isError(
  response: ErrorProps | OrganizationProps
): response is ErrorProps {
  return (
    typeof response === "object" &&
    response !== null &&
    "message" in response &&
    "error" in response &&
    "statusCode" in response
  );
}
