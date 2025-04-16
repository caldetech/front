"use client";

import { createServiceAction } from "@/actions/create-service";
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
import { Textarea } from "@/components/ui/textarea";
import { useSlug } from "@/contexts/SlugContext";
import { useServices } from "@/hooks/use-services";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const ITEMS_PER_PAGE = 5;

export default function Services() {
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, total, isLoading, error } = useServices(
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

  if (error) return <p>Erro ao carregar produtos</p>;

  async function handleSubmit(formData: FormData) {
    await createServiceAction({ slug, formData });
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <p className="hidden sm:flex">Adicionar</p>

              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar serviço</DialogTitle>
            </DialogHeader>

            <form action={handleSubmit} className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="title">Título</Label>

                <Input
                  type="text"
                  id="title"
                  name="title"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Descrição</Label>

                <Textarea
                  id="description"
                  name="description"
                  autoComplete="off"
                  spellCheck="false"
                ></Textarea>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="price">Preço</Label>

                <Input
                  type="text"
                  id="price"
                  name="price"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <Button type="submit">Adicionar</Button>
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
