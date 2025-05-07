"use server";

import ky from "ky";
import { cookies } from "next/headers";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async (request) => {
        const cookieStore = await cookies();
        console.log("cookieStore", cookieStore);

        const token = cookieStore.get("token");
        console.log("token", token);

        if (token) {
          request.headers.set("Authorization", `Bearer ${token.value}`);
        }
      },
    ],
  },
});
