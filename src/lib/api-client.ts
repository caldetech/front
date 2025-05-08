"use server";

import ky from "ky";
import { cookies } from "next/headers";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const cookieStore = await cookies();

        const token = cookieStore.get("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token.value}`);
        }
      },
    ],
  },
});
