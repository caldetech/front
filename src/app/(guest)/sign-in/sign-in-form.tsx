'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInWithEmailAndPassword } from "./actions";
import { useActionState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LogInForm() {
  const [{ success, message, errors }, formAction, isPending] = useActionState(signInWithEmailAndPassword, {
    success: false,
    message: null,
    errors: null
  })

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      {success === false && message && (
        <Alert variant={"destructive"}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

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

          {errors?.email && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.email[0]}</p>
          )}
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

          {errors?.password && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.password[0]}</p>
          )}
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
        </Button>
      </div>
    </form>
  );
}
