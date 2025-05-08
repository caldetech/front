"use server";

import { api } from "../lib/ky_api-client";

export async function confirmAccount({ tokenId }: { tokenId: string }) {
  try {
    await api.post("users/confirm-account", {
      json: {
        tokenId,
      },
    });

    return {
      success: true,
      message: "Usuário confirmado com sucesso.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Erro ao confirmar o usuário.",
    };
  }
}
