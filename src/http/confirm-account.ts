"use server";

import { api } from "../lib/api-client";

import { HTTPError } from "ky";

export async function confirmAccount({ tokenId }: { tokenId: string }) {
  try {
    const response = await api.post("users/confirm-account", {
      json: { tokenId },
    });

    return {
      success: true,
      message: "Usuário confirmado com sucesso!",
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorData = await error.response.json();

      // Verifica a mensagem específica vinda do backend
      if (errorData.message === "Token inválido") {
        return {
          success: false,
          message: "O link de confirmação é inválido ou expirou!",
        };
      }

      if (errorData.message === "Usuário não encontrado") {
        return {
          success: false,
          message: "Usuário não encontrado!",
        };
      }

      // Erro genérico
      return {
        success: false,
        message: errorData.message || "Erro desconhecido na confirmação",
      };
    }

    // Erro fora da API (ex.: rede)
    return {
      success: false,
      message: "Erro de conexão. Tente novamente mais tarde.",
    };
  }
}
