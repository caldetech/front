"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import SuccessNotification from "@/components/SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import { passwordRecoverAction } from "@/actions/password-recover";

export default function PasswordRecoverForm() {
  const [{ success, message, errors }, handleSubmit] = useFormState(
    passwordRecoverAction
  );

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
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

      <div className="flex flex-col gap-6">
        {errors?.email && <ErrorNotification message={errors.email[0]} />}

        {success && (
          <SuccessNotification message={"Recuperação de senha enviada"} />
        )}

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
