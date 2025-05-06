import { Suspense } from "react";
import NewPasswordFormContent from "./NewPasswordFormContent";

export default function NewPasswordForm() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <NewPasswordFormContent />
    </Suspense>
  );
}
