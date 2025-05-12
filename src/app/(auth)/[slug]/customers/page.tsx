"use client";

import { createCustomerAction } from "@/actions/create-customer";
import CustomTable from "@/components/CustomTable";
import ErrorNotification from "@/components/ErrorNotification";
import SuccessNotification from "@/components/SuccessNotification";
// import CustomTable from "@/components/CustomTable";
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
import { useSlug } from "@/contexts/SlugContext";
import useAuthToken from "@/hooks/use-auth-token";
import { useCustomers } from "@/hooks/use-customers";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const ITEMS_PER_PAGE = 5;

export default function Customers() {
  const [customerType, setCustomerType] = useState<string>("PERSONAL");
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [documentValue, setDocumentValue] = useState("");
  const [mainNumberValue, setMainNumberValue] = useState("");
  const [contactNumberValue, setContactNumberValue] = useState("");
  const [token] = useAuthToken();
  const fixedToken: string = token!;
  const { data, total, isLoading, error, mutate } = useCustomers(
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

  if (error) return <p>Erro ao carregar funcionários</p>;

  async function handleSubmit(formData: FormData) {
    formData.append("customerType", customerType);
    formData.set("document", documentValue);
    formData.set("mainNumber", mainNumberValue);
    formData.set("contactNumber", contactNumberValue);

    const customer = await createCustomerAction({ slug, formData, token });

    if (customer?.success) {
      setDocumentValue("");
      setMainNumberValue("");
      setContactNumberValue("");
      setShowErrorNotification(false);
      setShowSuccessNotification(true);
      await mutate();
    } else {
      setShowSuccessNotification(false);
      setShowErrorNotification(true);
    }
  }

  function handleOpenChange() {
    setShowSuccessNotification(false);
    setShowErrorNotification(false);
    setCustomerType("PERSONAL");
  }

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>

        <Dialog onOpenChange={handleOpenChange}>
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

                  <InputOTP
                    maxLength={11}
                    id="document"
                    name="document"
                    value={documentValue}
                    onChange={(val) => setDocumentValue(val)}
                  >
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

                  <InputOTP
                    maxLength={14}
                    id="document"
                    name="document"
                    value={documentValue}
                    onChange={(val) => setDocumentValue(val)}
                  >
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

                <InputOTP
                  maxLength={11}
                  id="mainNumber"
                  name="mainNumber"
                  value={mainNumberValue}
                  onChange={(val) => setMainNumberValue(val)}
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

              <div className="flex flex-col gap-1">
                <Label htmlFor="contactNumber">Contato (Recado)</Label>

                <InputOTP
                  maxLength={11}
                  id="contactNumber"
                  name="contactNumber"
                  value={contactNumberValue}
                  onChange={(val) => setContactNumberValue(val)}
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

              <div className="flex flex-col gap-4">
                {showSuccessNotification && (
                  <SuccessNotification message="Cliente adicionado com sucesso!" />
                )}

                {showErrorNotification && (
                  <ErrorNotification message="Erro ao adicionar cliente!" />
                )}

                <Button type="submit">Adicionar</Button>
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
          module="customers"
          slug={slug}
          token={fixedToken}
        />
      </div>
    </div>
  );
}
