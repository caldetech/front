"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createOrganizationAction } from "@/app/actions/create-organization";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { OrganizationProps } from "@/types/organization";

export default function Accounts() {
  const { data, error, isLoading } = useSWR<OrganizationProps[]>(
    "organizations/all",
    fetcher
  );

  async function handleSubmit(formData: FormData) {
    await createOrganizationAction(formData);
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contas</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <p className="hidden sm:flex">Adicionar</p>

              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar empresa</DialogTitle>
            </DialogHeader>

            <form action={handleSubmit} className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Nome</Label>

                <Input
                  id="name"
                  placeholder="Ex: CALDETECH"
                  name="name"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="slug">Usuário</Label>

                <Input
                  id="slug"
                  placeholder="Ex: caldetech"
                  name="slug"
                  type="text"
                />
              </div>

              <Button type="submit">Adicionar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        {isLoading ? (
          <p className="text-center bg-card text-card-foreground flex flex-col gap-6 rounded-md border py-6">
            Nenhuma conta encontrada.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data?.map((organization) => (
              <Card className="w-full flex" key={organization.id}>
                <div>
                  <p>{organization.name}</p>
                  <p>{organization.members[0].role}</p>
                </div>
                <span></span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
