"use server";

import ky from "ky";
import { cookies } from "next/headers"; // Importa a função cookies

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async (request) => {
        // Obtém o armazenamento de cookies no lado do servidor
        const cookieStore = await cookies();

        // Tenta obter o cookie "token"
        const token = cookieStore.get("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token.value}`);
        }
      },
    ],
  },
});
