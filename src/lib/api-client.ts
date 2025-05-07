import { getCookie } from "cookies-next";

import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getCookie("token");
        console.log(token);

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
