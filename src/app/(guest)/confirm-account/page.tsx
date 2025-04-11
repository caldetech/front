"use client";

import LogInForm from "../../../components/login-form";
import Link from "next/link";
import Image from "next/image";
import Background from "../../../../public/images/cover.png";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmAccount } from "@/http/confirm-account";

export default function ConfirmAccountPage() {
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("tokenId");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!tokenId) return;

    async function handleConfirmAccount(tokenId: string) {
      await confirmAccount({ tokenId })
        .then((res) => {
          if (res.success) {
            setLoading(true);
          }
        })
        .catch((error) => {
          console.error("Error confirming account:", error.message);
        });
    }

    handleConfirmAccount(tokenId);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen w-full">
      <div className="hidden bg-gray-100 lg:block">
        <Image src={Background} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="flex w-full items-center justify-center">
        {loading ? (
          <div className="w-full max-w-sm space-y-8 px-4">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-foreground">
                Bem-vindo (a)!
              </h2>
              <p className="mt-2 text-sm text-foreground">
                Por favor, faça login na sua conta
              </p>
            </div>

            <LogInForm />

            <div className="mt-6">
              <div className="mt-6 text-center text-sm">
                Ainda não tem uma conta?{" "}
                <Link href="/cadastrar" className="underline">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-bold text-foreground text-3xl">Aguarde</h1>

              <p className="text-foreground text-sm">
                Estamos confirmando sua conta
              </p>
            </div>

            <BeatLoader />
          </div>
        )}
      </div>
    </div>
  );
}
