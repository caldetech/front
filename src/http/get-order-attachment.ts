import { api } from "../lib/api-client";

export async function getOrderAttachmentById(id: string, token: string | null) {
  try {
    const attachment = await api.post("attachments/get-by-id", {
      json: {
        id,
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
    });

    return attachment.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
