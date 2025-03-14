'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter } from "next/navigation";
import { signUpAction } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
 
export default function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit] = useFormState(signUpAction, () => {
    router.push('/sign-in')
  })

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          <Label htmlFor="name" className="sr-only">
            Nome
          </Label>

          <Input
            id="name"
            name="name"
            type="text"
            required
            className="w-full"
            placeholder="Nome"
          />

          {errors?.name && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.name[0]}</p>
          )}
        </div>

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

        <div>
          <Label htmlFor="password_confirmation" className="sr-only">
            Confirme sua senha
          </Label>
          
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="current-password"
            required
            className="w-full"
            placeholder="Confirme sua senha"
          />

          {errors?.password_confirmation && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.password_confirmation[0]}</p>
          )}
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full">
          Criar conta
        </Button>
      </div>
    </form>
  );
}

