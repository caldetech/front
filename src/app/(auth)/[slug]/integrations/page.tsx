"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSlug } from "@/contexts/SlugContext";
import { getValidAccessToken } from "@/http/get-valid-bling-tokens";
import { getBlingAuthorizeUrl } from "@/http/get-bling-authorize-url";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IntegrationsPage() {
  const [blingConnection, setBlingConnection] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const slug = useSlug();

  async function handleSubmit() {
    const blingAuthorize = await getBlingAuthorizeUrl({ slug });

    router.push(blingAuthorize.url);
  }
  useEffect(() => {
    async function handleBlingAccessToken() {
      const accessToken = await getValidAccessToken({ slug });

      if (accessToken) {
        setBlingConnection(true);
        setLoading(false);
      }
    }

    handleBlingAccessToken();
  }, []);

  if (!blingConnection) return null;

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>

      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://www.bling.com.br/wp-content/uploads/2024/05/bling_favicon.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <div className="font-medium">Bling</div>

                  <div className="hidden text-xs text-muted-foreground">
                    Sistema ERP descomplicado, integrado e 100% online!
                  </div>
                </div>
              </div>

              {loading ? (
                <Button variant="outline" size="sm" onClick={handleSubmit}>
                  Conectar
                </Button>
              ) : (
                <Button variant="destructive" size="sm">
                  Desconectar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
