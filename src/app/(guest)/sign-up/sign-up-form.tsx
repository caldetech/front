"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { createUserAction } from "@/actions/create-user";
import NotificationError from "@/components/ErrorNotification";

export default function SignUpForm() {
  const router = useRouter();

  const [{ success, message, errors }, handleSubmit] = useFormState(
    createUserAction,
    () => {
      router.push("/entrar");
    }
  );

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
        </div>

        <div>
          <Label htmlFor="email" className="sr-only">
            E-mail
          </Label>

          <Input
            id="email"
            name="email"
            type="text"
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
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {errors?.name && <NotificationError message={errors.name[0]} />}

        {errors?.email && <NotificationError message={errors.email[0]} />}

        {errors?.password && <NotificationError message={errors.password[0]} />}

        {errors?.password_confirmation && (
          <NotificationError message={errors.password_confirmation[0]} />
        )}

        <Button type="submit" className="w-full">
          Criar conta
        </Button>
      </div>
    </form>
  );
}
