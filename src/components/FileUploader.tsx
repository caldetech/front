"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api-client";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import { useStore } from "@/stores/use-mutate";
import useAuthToken from "@/hooks/use-auth-token";

export default function FileUploader({ orderId }: { orderId: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { mutate } = useStore();
  const [token] = useAuthToken();

  function handleMutate() {
    mutate();
  }

  const uploadToS3WithProgress = (file: File, url: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setProgress(percent);
        }
      });

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
            setTimeout(() => {
              setShowSuccessMessage(true);
              handleMutate();
            }, 1000);
          } else {
            setShowErrorMessage(true);
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);

    try {
      // 1. Pedir URL assinada ao backend
      const signRes = await api.post("attachments/sign-upload", {
        json: {
          filename: selectedFile.name,
          mimetype: selectedFile.type,
        },
        hooks: {
          beforeRequest: [
            (request) => {
              if (token) {
                request.headers.set("Authorization", `Bearer ${token}`);
              }
            },
          ],
        },
      });

      const { url, key } = await signRes.json<{ key: string; url: string }>();

      // 2. Enviar direto ao S3 com a signed URL usando ky
      await uploadToS3WithProgress(selectedFile, url);

      // 3. Notificar backend que upload foi concluído
      await api.post("attachments/confirm-upload", {
        json: {
          orderId,
          filename: selectedFile.name,
          mimetype: selectedFile.type,
          size: selectedFile.size,
          key,
        },
        hooks: {
          beforeRequest: [
            (request) => {
              if (token) {
                request.headers.set("Authorization", `Bearer ${token}`);
              }
            },
          ],
        },
      });

      setSelectedFile(null);
      setProgress(100);
    } catch (err) {
      console.error("Erro durante o upload:", err);
      alert("Erro durante o upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="text-sm">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col"
          />
        </div>

        {uploading && <Progress value={progress} className="w-full" />}
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        {showSuccessMessage && (
          <SuccessNotification message="Enviado com sucesso!" />
        )}

        {showErrorMessage && (
          <ErrorNotification message="Falha ao enviar arquivo!" />
        )}

        <Button
          size="lg"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          {uploading ? "Enviando..." : "Carregar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
