"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SuccessNotification from "@/components/SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import { newPasswordAction } from "@/actions/new-password";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function NewPasswordForm() {
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("token");
  const router = useRouter();

  const actionWrapper = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    formData.append("tokenId", tokenId || "");

    return await newPasswordAction(formData);
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    actionWrapper,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/entrar");
    }
  }, [state]);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      <div>
        <Label htmlFor="password" className="sr-only">
          Nova senha
        </Label>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full"
          placeholder="Nova senha"
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

      <div className="flex flex-col gap-6">
        {state.errors?.password && (
          <ErrorNotification message={state.errors.password[0]} />
        )}

        {state.errors?.password_confirmation && (
          <ErrorNotification message={state.errors.password_confirmation[0]} />
        )}

        {state.success && (
          <SuccessNotification message={"Senha alterada com sucesso"} />
        )}

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
