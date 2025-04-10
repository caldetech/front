"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlingAuthorizeUrl } from "@/http/get-bling-authorize-url";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IntegrationsPage() {
  const [blingConnection, setBlingConnection] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function handleSubmit() {
    const blingAuthorize = await getBlingAuthorizeUrl();

    router.push(blingAuthorize.url);
  }

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

              {!blingConnection ? (
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
