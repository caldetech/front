'use client'

import CustomTable from "@/components/CustomTable";
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
} from "@/components/ui/command"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { searchCustomer } from "@/http/search-customer";

interface CustomerSearch {
  id: string;
  customerType: "PERSONAL" | "COMPANY";
  name: string;
  document: string;
  mainNumber: string;
  contactNumber: string;
  address: string;
  createdAt: Date; 
  updatedAt: Date;
  organizationId: string;
}

export default function Orders() {
  // CUSTOMER
  const [customerTyped, setCustomerTyped] = useState<string | undefined>()
  const [customerSuggestions, setCustomerSuggestions] = useState<CustomerSearch[] | undefined>([])
  const [chosenCustomer, setChosenCustomer] = useState<CustomerSearch | undefined>()

  useEffect(() => {
    if (customerTyped && (customerTyped ?? '').length > 3) {
      (async () => {
        const result = await searchCustomer({ query: customerTyped }) as CustomerSearch[];

        setCustomerSuggestions([...result]); 
      })();
    }

    if (!(customerTyped ?? "").length) {
      setCustomerSuggestions([]);
    }

    if (customerTyped != chosenCustomer?.name) {
      setChosenCustomer(undefined)
    }
  }, [customerTyped]);

  useEffect(() => {
    setCustomerTyped(chosenCustomer?.name)
    setCustomerSuggestions([])
  }, [chosenCustomer])

  // ###########################################################################
  // ###########################################################################
  // PRODUCT
  // ###########################################################################
  // ###########################################################################

  const [productTyped, setProductTyped] = useState<string | undefined>()
  const [productSuggestions, setProductSuggestions] = useState<CustomerSearch[] | undefined>([])
  const [chosenProduct, setChosenProduct] = useState<CustomerSearch | undefined>()

  // ###########################################################################
  // ###########################################################################
  // HANDLE SUBMIT
  // ###########################################################################
  // ###########################################################################

  async function handleSubmit(formData: FormData) {
    console.log(Object.fromEntries(formData.entries()))
    // await createOrderAction(formData)
  }

  // ###########################################################################
  // ###########################################################################
  // CODE
  // ###########################################################################
  // ###########################################################################

  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ordens</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <p className="hidden sm:flex">Adicionar</p>

              <Plus className="sm:hidden" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar ordem</DialogTitle>
            </DialogHeader>

            <form action={handleSubmit} className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-1">
                <Label>Cliente</Label>

                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                  <CommandInput setIconActivated={!!chosenCustomer} value={customerTyped ?? undefined} onValueChange={setCustomerTyped} placeholder="Pesquisar..." />
                  
                  <CommandList className={`${!!chosenCustomer ? 'hidden' : ''}`}>
                    <CommandEmpty className={`flex items-center justify-center py-1`}>Nenhum resultado.</CommandEmpty>

                    {(customerSuggestions as CustomerSearch[]).map((customerTyped) => (
                      <CommandItem key={customerTyped.id} onSelect={() => setChosenCustomer(customerTyped)}>
                        {customerTyped.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
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
          <CustomTable />
      </div>
    </div>
  );
}
