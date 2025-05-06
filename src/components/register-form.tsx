import { Suspense } from "react";
import RegisterFormContent from "./RegisterFormContent";

export default function RegisterForm() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
