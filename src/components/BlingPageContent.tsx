"use client";

import useAuthToken from "@/hooks/use-auth-token";
import { getBlingTokens } from "@/http/get-bling-tokens";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function BlingPageContent() {
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");
  const router = useRouter();
  const [token] = useAuthToken();

  useEffect(() => {
    async function handleBlingTokens() {
      if (code && state && token) {
        try {
          const tokens = await getBlingTokens({ code, state, token });

          if (tokens) {
            router.push(
              `${process.env.NEXT_PUBLIC_FRONT_URL}/${state}/integracoes`
            );
          }
        } catch (error) {
          console.error("Erro ao obter tokens do Bling:", error);
        }
      }
    }

    handleBlingTokens();
  }, [code, state, token]);

  return (
    <div className="absolute top-1/2 left-1/2 flex h-screen w-screen items-center justify-center">
      {loading && (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col">
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Por favor, aguarde
            </h2>

            <p className="mt-2 text-sm text-foreground">
              Estamos conectando sua conta ao Bling
            </p>
          </div>

          <BeatLoader />
        </div>
      )}
    </div>
  );
}
