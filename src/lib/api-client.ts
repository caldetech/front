import ky from "ky";
import Cookie from "js-cookie";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookie.get("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
