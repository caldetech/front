"use client";

import Image from "next/image";
import RegisterForm from "../../../components/register-form";
import Background from "../../../../public/images/cover.png";

export default function RegisterPage() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen w-full">
      <div className="hidden bg-gray-100 lg:block">
        <Image src={Background} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-sm space-y-8 px-4">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Cadastre-se
            </h2>
            <p className="mt-2 text-sm text-foreground">
              Crie uma nova conta para acessar a dashboard.
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6">
            <p className="mt-6 text-center text-sm text-foreground">
              Já tem uma conta?{" "}
              <a href="/entrar" className="text-foreground underline">
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
