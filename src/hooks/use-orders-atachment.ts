import { useState, useEffect } from "react";
import { getOrderAttachmentById } from "@/http/get-order-attachment";

// Hook para buscar os anexos de forma eficiente
export function useOrdersAttachment(ids: string[]) {
  const [attachments, setAttachments] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAttachments() {
      setLoading(true);
      setError(null); // Reseta o erro ao iniciar nova busca

      try {
        const attachmentResults: Record<string, boolean> = {};

        // Faz as requisições paralelamente
        await Promise.all(
          ids.map(async (id) => {
            const result = await getOrderAttachmentById(id);
            attachmentResults[id] = !!result; // true se attachment existe
          })
        );

        setAttachments(attachmentResults);
      } catch (err) {
        setError(err as Error); // Captura o erro
      } finally {
        setLoading(false);
      }
    }

    if (ids.length > 0) {
      fetchAttachments();
    }
  }, [ids]);

  return { attachments, loading, error };
}
