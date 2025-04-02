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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Accounts() {
  function handleSubmit() {}

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
                <Label>Cliente</Label>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Tipo de ordem</Label>

                <Select name="type">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SALE">Venda</SelectItem>
                      <SelectItem value="BUDGET">Garantia</SelectItem>
                      <SelectItem value="WARRANTY">Orçamento</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Adicionar produto</Label>

                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                  <CommandInput placeholder="Pesquisar..." />

                  <CommandList>
                    <CommandEmpty>Nenhum resultado.</CommandEmpty>

                    <CommandGroup heading="Sugestões">
                      <CommandItem>
                        <span>Calendar</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Adicionar serviço</Label>

                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                  <CommandInput placeholder="Pesquisar..." />

                  <CommandList>
                    <CommandEmpty>Nenhum resultado.</CommandEmpty>

                    <CommandGroup heading="Sugestões">
                      <CommandItem>
                        {/* <Calendar /> */}
                        <span>Calendar</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Método de pagamento</Label>

                <Select name="method">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PIX">Pix</SelectItem>
                      <SelectItem value="CARD">Cartão</SelectItem>
                      <SelectItem value="BILL">Boleto</SelectItem>
                      <SelectItem value="MONEY">Dinheiro</SelectItem>
                      <SelectItem value="DEPOSIT">Depósito</SelectItem>
                      <SelectItem value="PENDING">Pendente</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Valor total</Label>

                <Input name="price" type="text" />
              </div>

              <Button type="submit">Adicionar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
