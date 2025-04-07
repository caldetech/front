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
import { Plus, Search } from "lucide-react";

export default function Orders() {
  async function handleSubmit(formData: FormData) {
    await createInviteAction(formData);
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ordens</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="cursor-pointer">
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

                <div className="flex relative">
                  <Input
                    name="customer"
                    type="text"
                    id="customer"
                    autoComplete="off"
                    spellCheck="false"
                    className="pl-8"
                  />

                  <Search className="h-4 w-4 absolute top-[10px] ml-[10px] opacity-50" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="customer">Produto</Label>

                <div className="flex relative">
                  <Input
                    name="customer"
                    type="text"
                    id="customer"
                    autoComplete="off"
                    spellCheck="false"
                    className="pl-8"
                  />

                  <Search className="h-4 w-4 absolute top-[10px] ml-[10px] opacity-50" />
                </div>
              </div>

              <Button type="submit">Criar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <CustomTable />
      </div>
    </div>
  );
}
