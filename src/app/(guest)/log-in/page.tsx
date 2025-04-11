import LogInForm from "../../../components/login-form";
import Link from "next/link";
import Image from "next/image";
import Background from "../../../../public/images/cover.png";

export default function LogInPage() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen w-full">
      <div className="hidden bg-gray-100 lg:block">
        <Image src={Background} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="flex w-full items-center justify-center">
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
      </div>
    </div>
  );
}
