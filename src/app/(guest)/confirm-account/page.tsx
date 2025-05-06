import ConfirmAccountPageContent from "@/components/ConfirmAccountPageContent";
import { Suspense } from "react";

export default function ConfirmAccountPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ConfirmAccountPageContent />
    </Suspense>
  );
}
