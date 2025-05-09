import { api } from "@/lib/api-client";

export const fetcher = async (url: string, token: string) =>
  await api.get(url, {
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
