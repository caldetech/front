"use client";

import { createCustomerAction } from "@/actions/create-customer";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Customers() {
  const [customerType, setCustomerType] = useState<string>("PERSONAL");

  async function handleSubmit(formData: FormData) {
    formData.append("customerType", customerType);
    await createCustomerAction(formData);
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <p className="hidden sm:flex">Adicionar</p>

              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar cliente</DialogTitle>
            </DialogHeader>

            <form action={handleSubmit} className="flex flex-col gap-4 py-4">
              <RadioGroup
                defaultValue="PERSONAL"
                className="flex"
                onValueChange={(value) => setCustomerType(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PERSONAL" id="PERSONAL" />
                  <Label htmlFor="PERSONAL">Física</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COMPANY" id="COMPANY" />
                  <Label htmlFor="COMPANY">Jurídica</Label>
                </div>
              </RadioGroup>

              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Nome</Label>

                <Input id="name" name="name" type="text" />
              </div>

              {customerType == "PERSONAL" && (
                <div className="flex flex-col gap-1">
                  <Label htmlFor="document">CPF</Label>

                  <InputOTP maxLength={11} id="document" name="document">
                    <InputOTPGroup className="flex flex-wrap gap-1">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                      <InputOTPSlot index={8} />
                      <InputOTPSlot index={9} />
                      <InputOTPSlot index={10} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}

              {customerType == "COMPANY" && (
                <div className="flex flex-col gap-1">
                  <Label htmlFor="document">CNPJ</Label>

                  <InputOTP maxLength={14} id="document" name="document">
                    <InputOTPGroup className="flex flex-wrap gap-1">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                      <InputOTPSlot index={8} />
                      <InputOTPSlot index={9} />
                      <InputOTPSlot index={10} />
                      <InputOTPSlot index={11} />
                      <InputOTPSlot index={12} />
                      <InputOTPSlot index={13} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <Label htmlFor="address">Endereço</Label>

                <Input id="address" name="address" />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="mainNumber">Contato (Principal)</Label>

                <InputOTP maxLength={11} id="mainNumber" name="mainNumber">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                    <InputOTPSlot index={10} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="contactNumber">Contato (Recado)</Label>

                <InputOTP
                  maxLength={11}
                  id="contactNumber"
                  name="contactNumber"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                    <InputOTPSlot index={10} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button type="submit">Adicionar</Button>
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
