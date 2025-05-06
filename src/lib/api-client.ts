// lib/api.ts
import ky from "ky";
import { cookies } from "next/headers";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === "undefined") {
          const cookieStore = await cookies();
          const token = cookieStore.get("token")?.value;

          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        } else {
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        }
      },
    ],
  },
});
