import { useState, useEffect } from "react";
import { getOrderAttachmentById } from "@/http/get-order-attachment";

export function useOrdersAttachment(ids: string[], token: string | null) {
  const [attachments, setAttachments] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAttachments() {
      setLoading(true);
      setError(null);

      try {
        const attachmentResults: Record<string, boolean> = {};

        await Promise.all(
          ids.map(async (id) => {
            const result = await getOrderAttachmentById(id, token);
            attachmentResults[id] = !!result;
          })
        );

        setAttachments(attachmentResults);
      } catch (err) {
        setError(err as Error);
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
