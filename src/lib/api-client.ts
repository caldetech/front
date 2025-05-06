import ky from "ky";
import type { CookiesFn } from "cookies-next";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined;

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");
          cookieStore = serverCookies;
        }
      },
    ],
  },
});
