import { api } from "../lib/ky_api-client";

export async function getOrderAttachmentById(id: string) {
  try {
    const attachment = await api.post("attachments/get-by-id", {
      json: {
        id,
      },
    });

    return attachment.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
