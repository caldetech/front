"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Briefcase, Building2, ChevronRight, Plus, Power } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createOrganizationAction } from "@/actions/create-organization";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import { OrganizationProps } from "@/types/organization";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isError } from "@/validations/is-error";
import { isOrganization } from "@/validations/ir-organization";
import SuccessNotification from "@/components/SuccessNotification";
import ErrorNotification from "@/components/ErrorNotification";
import { Badge } from "@/components/ui/badge";
import useAuthToken from "@/hooks/use-auth-token";
import { useCookies } from "react-cookie";

export default function Accounts() {
  const [creationErrorMessage, setCreationErrorMessage] = useState<
    string | null
  >(null);
  const [successfulCreationMessage, setSuccessfulCreationMessage] = useState<
    string | null
  >(null);
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [token, setToken] = useAuthToken();

  useEffect(() => {
    const tokenFromCookie = cookies.token;
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, [cookies.token, setToken]);

  const shouldFetch = !!token;

  const { data, error, isLoading, mutate } = useSWR<OrganizationProps[]>(
    shouldFetch ? ["organizations/all", token] : null,
    async ([url, token]: [string, string]) => {
      const response = await fetcher(url, token);
      return (await response.json()) as OrganizationProps[];
    }
  );

  async function handleSubmit(formData: FormData) {
    const organization = await createOrganizationAction({ formData, token });

    if (isError(organization)) {
      setSuccessfulCreationMessage(null);
      setCreationErrorMessage(organization.message);
    }

    if (isOrganization(organization)) {
      setCreationErrorMessage(null);
      setSuccessfulCreationMessage("Organização criada com sucesso");
      await mutate();
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setCreationErrorMessage(null);
      setSuccessfulCreationMessage(null);
    }
  };

  async function handleLogout() {
    await fetch("/api/auth/sign-out", { method: "GET" });
    window.location.href = "/entrar";
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6 h-screen">
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
                  <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <Badge variant={"outline"}>{organization.name}</Badge>
                    </p>

                    <p className="flex items-center gap-2">
                      {/* <Briefcase className="h-4 w-4" /> */}

                      <Badge variant={"secondary"}>
                        {organization.members[0].role == "ADMIN"
                          ? "Administrador"
                          : ""}
                        {organization.members[0].role == "MEMBER"
                          ? "Membro"
                          : ""}
                        {organization.members[0].role == "BILLING"
                          ? "Financeiro"
                          : ""}
                        {organization.members[0].role == "MANAGER"
                          ? "Gerente"
                          : ""}
                      </Badge>
                    </p>
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

      <Button
        className="sm:hidden absolute rounded-full w-12 h-12 bottom-4 right-4"
        onClick={handleLogout}
      >
        <Power />
      </Button>
    </div>
  );
}
