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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { createOrganizationAction } from "@/app/actions/create-organization";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

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
        {accounts.length === 0 ? (
          <p className="text-center bg-card text-card-foreground flex flex-col gap-6 rounded-md border py-6">
            Nenhuma conta encontrada.
          </p>
        ) : (
          <div>
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader>
                  <CardTitle>{account.title}</CardTitle>
                  <CardDescription>{account.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{account.content}</p>
                </CardContent>
                <CardFooter>
                  <p>{account.footer}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
