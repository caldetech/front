"use client";

import { createProductAction } from "@/actions/create-product";
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
import useAuthToken from "@/hooks/use-auth-token";
import { useProducts } from "@/hooks/use-products";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const ITEMS_PER_PAGE = 5;

export default function Products() {
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const [token] = useAuthToken();
  const fixedToken: string = token!;
  const { data, total, isLoading, error, totalPages } = useProducts(
    currentPage,
    ITEMS_PER_PAGE,
    slug,
    token
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
    await createProductAction(formData, token);
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

        <Dialog>
          <DialogContent>
            <DialogHeader className="cursor-pointer">
              <DialogTitle>Adicionar produto</DialogTitle>
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
                <Label htmlFor="stock">Estoque</Label>

                <Input
                  type="number"
                  id="stock"
                  name="stock"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="costPrice">Preço de custo</Label>

                <Input
                  type="text"
                  id="costPrice"
                  name="costPrice"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="salesPrice">Preço de venda</Label>

                <Input
                  type="text"
                  id="salesPrice"
                  name="salesPrice"
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
          module="products"
          slug={slug}
          token={fixedToken}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
