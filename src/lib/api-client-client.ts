import ky from "ky";

const token = localStorage.getItem("token");

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});
