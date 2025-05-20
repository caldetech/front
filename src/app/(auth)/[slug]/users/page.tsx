"use client";

import { createInviteAction } from "@/actions/create-invite";
import CustomTable from "@/components/CustomTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSlug } from "@/contexts/SlugContext";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useEmployees } from "@/hooks/use-employees";
import { BeatLoader } from "react-spinners";
import SuccessNotification from "@/components/SuccessNotification";
import ErrorNotification from "@/components/ErrorNotification";
import useAuthToken from "@/hooks/use-auth-token";
import { useUser } from "@/contexts/UserContext";
import { useInvites } from "@/hooks/use-invites";

const ITEMS_PER_PAGE = 5;

export default function Users() {
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [role, setRole] = useState("MEMBER");
  const [token] = useAuthToken();
  const fixedToken: string = token!;
  // const { data, total, isLoading, error, mutate } = useEmployees(
  //   currentPage,
  //   ITEMS_PER_PAGE,
  //   slug,
  //   token
  // );
  const user = useUser();
  const { data, total, isLoading, error, mutate } = useInvites(
    currentPage,
    ITEMS_PER_PAGE,
    slug,
    fixedToken,
    user.membership
  );
  console.log(data);
  console.log(error);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  if (error) return <p>Erro ao carregar funcionários</p>;

  async function handleSubmit(formData: FormData) {
    const invite = await createInviteAction({
      formData,
      slug,
      token,
      memberId: user.membership,
    });

    if (invite?.success) {
      setShowErrorNotification(false);
      setShowSuccessNotification(true);
      await mutate();
    } else {
      setShowSuccessNotification(false);
      setShowErrorNotification(true);
    }
  }

  function handleNotifications() {
    setShowSuccessNotification(false);
    setShowErrorNotification(false);
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>

        <Dialog onOpenChange={handleNotifications}>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="cursor-pointer">
              <p className="hidden sm:flex">Adicionar</p>

              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar convite</DialogTitle>
            </DialogHeader>

            <form className="flex flex-col gap-4" action={handleSubmit}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="role">Função</Label>
                <Select name="role" value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="DEV">Desenvolvedor</SelectItem>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="BILLING">Financeiro</SelectItem>
                      <SelectItem value="MANAGER">Gerente</SelectItem>
                      <SelectItem value="MEMBER">Membro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-4">
                {showSuccessNotification && (
                  <SuccessNotification message="Convite enviado com sucesso!" />
                )}

                {showErrorNotification && (
                  <ErrorNotification message="Erro ao enviar convite!" />
                )}

                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <CustomTable
          data={data}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={total}
          itemsPerPage={ITEMS_PER_PAGE}
          module="users"
          slug={slug}
          token={fixedToken}
          tableName="invites"
        />
      </div>
    </div>
  );
}
