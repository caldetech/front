"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserAction } from "@/actions/create-user";
import ErrorNotification from "@/components/ErrorNotification";
import SuccessNotification from "./SuccessNotification";
import { useActionState, useEffect } from "react";

interface FormState {
  success: boolean | null;
  message: string | null;
  errors: Record<string, string[]> | null;
}

const initialState: FormState = {
  success: null,
  message: null,
  errors: null,
};

export default function RegisterFormContent() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  const router = useRouter();
  const actionWrapper = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    formData.append("inviteId", inviteId || "");

    return await createUserAction(formData);
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    actionWrapper,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push("/entrar");
      }, 1000);
    }
  }, [state]);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
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
        <Button type="submit" className="w-full">
          Criar conta
        </Button>
      </div>
    </form>
  );
}
