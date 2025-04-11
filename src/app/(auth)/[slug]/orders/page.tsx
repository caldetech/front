"use client";

import { createOrderAction } from "@/actions/create-order";
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
import { Textarea } from "@/components/ui/textarea";
import { useSlug } from "@/contexts/SlugContext";
import { Plus } from "lucide-react";

export default function Orders() {
  const slug = useSlug();
  async function handleSubmit(formData: FormData) {
    await createOrderAction({ formData, slug });
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ordens</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <p className="hidden sm:flex">Adicionar</p>
              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova ordem de serviço</DialogTitle>
            </DialogHeader>

            <form className="flex flex-col gap-4" action={handleSubmit}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="customer">Cliente</Label>
                <Input name="customer" id="customer" type="text" />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Descrição do serviço</Label>
                <Textarea name="description" id="description" />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="type">Tipo</Label>
                <Select name="type">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SALE">Venda</SelectItem>
                      <SelectItem value="BUDGET">Orçamento</SelectItem>
                      <SelectItem value="WARRANTY">Garantia</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="value">Valor</Label>
                <Input name="value" id="value" type="text" />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="payment">Pagamento</Label>
                <Select name="payment">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="CARTAO">Cartão</SelectItem>
                      <SelectItem value="BOLETO">Boleto</SelectItem>
                      <SelectItem value="DEPOSITO">Depósito</SelectItem>
                      <SelectItem value="INDEFINIDO">Indefinido</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="commission">Comissão</Label>
                <Input name="commission" id="commission" type="text" />
              </div>

              <Button type="submit">Criar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>{/* Tabela de ordens aqui futuramente */}</div>
    </div>
  );
}
