import ky from "ky";

const isBrowser = typeof window !== "undefined";

const token = isBrowser ? localStorage.getItem("token") : null;

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});
