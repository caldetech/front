import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInWithEmailAndPassword } from "./actions";

export default function LogInForm() {
  return (
    <form className="mt-8 space-y-6" action={signInWithEmailAndPassword}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="sr-only">
            E-mail
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full"
            placeholder="E-mail"
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Senha
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full"
            placeholder="Senha"
          />
        </div>
        <div className="text-end">
          <Link
            href="/dashboard/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
    </form>
  );
}
