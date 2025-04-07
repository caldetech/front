"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createOrganizationAction } from "@/actions/create-organization";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import type { OrganizationProps } from "@/types/organization";
import Link from "next/link";
import { useState } from "react";
import ErrorNotification from "@/components/ErrorNotification";
import { isError } from "@/validations/is-error";
import { isOrganization } from "@/validations/ir-organization";
import SuccessNotification from "@/components/SuccessNotification";

export default function Accounts() {
  const { data, error, isLoading } = useSWR<OrganizationProps[]>(
    "organizations/all",
    fetcher
  );
  const [creationErrorMessage, setCreationErrorMessage] = useState<
    string | null
  >(null);
  const [successfulCreationMessage, setSuccessfulCreationMessage] = useState<
    string | null
  >(null);
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const organization = await createOrganizationAction(formData);

    if (isError(organization)) {
      setCreationErrorMessage(organization.message);
    }

    if (isOrganization(organization)) {
      setSuccessfulCreationMessage("Organização criada com sucesso");
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setCreationErrorMessage(null);
      setSuccessfulCreationMessage(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contas</h1>

        <Dialog open={open} onOpenChange={handleOpenChange}>
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

              {creationErrorMessage && (
                <ErrorNotification message={creationErrorMessage} />
              )}

              {successfulCreationMessage && (
                <SuccessNotification message={successfulCreationMessage} />
              )}

              <Button type="submit">Adicionar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        {isLoading || !data?.length ? (
          <p className="text-center bg-card text-card-foreground flex flex-col gap-6 rounded-md border py-6">
            Nenhuma conta encontrada.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {data?.map((organization) => (
              <Link href={`${organization.slug}/ordens`} key={organization.id}>
                <Card className="w-full flex flex-row items-center px-6 justify-between">
                  <div>
                    <p>{organization.name}</p>
                    <p>{organization.members[0].role}</p>
                  </div>

                  <span className="border border-[#EFEFEF] p-2 rounded-sm m-2 hover:bg-[#F3F4F6] cursor-pointer">
                    <ChevronRight />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
