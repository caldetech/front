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
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { User } from "@/schemas/user";
import { useEmployees } from "@/hooks/use-employees";
import { BeatLoader } from "react-spinners";

const ITEMS_PER_PAGE = 5;

export default function Users() {
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, total, isLoading, error } = useEmployees(
    currentPage,
    ITEMS_PER_PAGE,
    slug
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  if (error) return <p>Erro ao carregar funcionários</p>;

  async function handleSubmit(formData: FormData) {
    await createInviteAction({ formData, slug });
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>

        <Dialog>
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
                <Select name="role">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="BILLING">Financeiro</SelectItem>
                      <SelectItem value="MANAGER">Gerente</SelectItem>
                      <SelectItem value="MEMBER">Membro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit">Enviar</Button>
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
        />
      </div>
    </div>
  );
}
