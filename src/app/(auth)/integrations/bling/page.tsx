import BlingPageContent from "@/components/BlingPageContent";
import { Suspense } from "react";

export default function BlingPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <BlingPageContent />
    </Suspense>
  );
}
