"use server";

import type { OrganizationProps } from "@/types/organization";
import { api } from "../lib/ky_api-client";
import type { ErrorProps } from "@/types/error";

export async function createOrganization({
  name,
  slug,
}: {
  name: string;
  slug: string;
}): Promise<OrganizationProps | ErrorProps> {
  try {
    const organization = await api.post("organizations/create", {
      json: {
        name,
        slug,
      },
    });

    return organization.json<OrganizationProps>();
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null
    ) {
      const typedError = error as {
        response: {
          json: () => Promise<unknown>;
        };
      };

      return typedError.response.json() as Promise<ErrorProps>;
    }

    return {
      error: "Internal Server Error",
      message: "Erro inesperado",
      statusCode: 500,
    };
  }
}
