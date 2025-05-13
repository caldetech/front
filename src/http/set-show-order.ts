"use server";

import { api } from "../lib/api-client";

export async function setShowOrder({
  orderId,
  token,
  showOrder,
}: {
  orderId: string;
  token: string | null;
  showOrder: boolean;
}) {
  try {
    return await api
      .post("orders/update-visibility", {
        json: {
          orderId,
          showOrder,
        },
        hooks: {
          beforeRequest: [
            (request) => {
              if (token) {
                request.headers.set("Authorization", `Bearer ${token}`);
              }
            },
          ],
        },
      })
      .json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
