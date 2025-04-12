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
import { useEffect, useState } from "react";

// MOCK DATA

const customers = [
  { id: "1", name: "João da Silva" },
  { id: "2", name: "Maria Oliveira" },
  { id: "3", name: "Carlos Souza" },
];

const members = [
  { id: "1", user: { name: "Ana Técnico" } },
  { id: "2", user: { name: "Bruno Mecânico" } },
  { id: "3", user: { name: "Fernanda Elétrica" } },
];

const products = [
  { id: "1", title: "Bateria 60Ah" },
  { id: "2", title: "Filtro de óleo" },
  { id: "3", title: "Pneu Aro 15" },
];

export default function Orders() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(products.filter((p) => p.title.toLowerCase().includes(q)));
  }, [query]);
  const [selected, setSelected] = useState<
    { id: string; title: string; quantity: number }[]
  >([]);

  function handleAddProduct(product: { id: string; title: string }) {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setSelected((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  }

  function removeProduct(productId: string) {
    setSelected((prev) => prev.filter((p) => p.id !== productId));
  }

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

          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova ordem de serviço</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-4" action={handleSubmit}>
              {/* Cliente */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="customerId">Cliente</Label>
                <Select name="customerId">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de ordem */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="type">Tipo</Label>
                <Select name="type">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SALE">Venda</SelectItem>
                    <SelectItem value="BUDGET">Orçamento</SelectItem>
                    <SelectItem value="WARRANTY">Garantia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="product-search">Pesquisar produto</Label>
                  <Input
                    id="product-search"
                    placeholder="Digite para buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  {filtered.length > 0 ? (
                    <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                      {filtered.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => {
                            handleAddProduct(product);
                            setQuery(""); // limpa o campo após adicionar
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {product.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    query && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Nenhum produto encontrado.
                      </p>
                    )
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {selected.map((p) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <span>{p.title}</span>
                      <Input
                        type="number"
                        min={1}
                        value={p.quantity}
                        onChange={(e) =>
                          updateQuantity(p.id, Number(e.target.value))
                        }
                        name={`product_quantity_${p.id}`}
                        className="w-20"
                      />
                      <input type="hidden" name="products[]" value={p.id} />
                      <Button
                        variant="ghost"
                        onClick={() => removeProduct(p.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagamento */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentMethod">Método de pagamento</Label>
                <Select name="paymentMethod">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="CARTAO">Cartão</SelectItem>
                    <SelectItem value="BOLETO">Boleto</SelectItem>
                    <SelectItem value="DEPÓSITO">Depósito</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentAmount">Valor do pagamento</Label>
                <Input name="paymentAmount" type="text" />
              </div>

              {/* Comissão por funcionário */}
              <div className="flex flex-col gap-2">
                <Label>Comissões</Label>
                {members.map((member) => (
                  <div key={member.id} className="flex gap-2 items-center">
                    <span>{member.user.name}</span>
                    <Input
                      type="number"
                      name={`commission_${member.id}`}
                      placeholder="R$"
                      className="w-24"
                    />
                  </div>
                ))}
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
