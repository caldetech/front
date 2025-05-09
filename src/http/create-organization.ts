"use server";

import { OrganizationProps } from "@/types/organization";
import { api } from "../lib/api-client";
import { ErrorProps } from "@/types/error";

export async function createOrganization({
  name,
  slug,
  token,
}: {
  name: string;
  slug: string;
  token: string | null;
}): Promise<OrganizationProps | ErrorProps> {
  try {
    const organization = await api.post("organizations/create", {
      json: {
        name,
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
