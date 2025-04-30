"use client";

import { createOrderAction } from "@/actions/create-order";
import CustomTable from "@/components/CustomTable";
import SuccessNotification from "@/components/SuccessNotification";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSlug } from "@/contexts/SlugContext";
import { useOrders } from "@/hooks/use-orders";
import { searchCustomer } from "@/http/search-customer";
import { searchEmployee } from "@/http/search-employee";
import { searchProduct } from "@/http/search-product";
import type { Customer } from "@/schemas/customer";
import type { Employee } from "@/schemas/employee";
import type { Product } from "@/schemas/products";
import { useStore } from "@/stores/use-mutate";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ITEMS_PER_PAGE = 5;

export default function Orders() {
  const [productQuery, setProductQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const [selectedMembers, setSelectedMembers] = useState<
    { id: string; name: string }[]
  >([]);
  const [memberQuery, setMemberQuery] = useState("");
  const [totalCommissionPercent, setTotalCommissionPercent] = useState(0);
  const [selected, setSelected] = useState<Product[]>([]);
  const [customerQuery, setCustomerQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedClient, setSelectedClient] = useState(false);
  const [customer, setCustomer] = useState<{ id: string; name: string } | null>(
    null
  );
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, total, isLoading, error, mutate } = useOrders(
    currentPage,
    ITEMS_PER_PAGE,
    slug
  );

  const { setMutate } = useStore();

  useEffect(() => {
    setMutate(mutate);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productQuery.length < 3) {
        setFilteredProducts([]);
        return;
      }

      try {
        const products = await searchProduct({ query: productQuery, slug });

        if (products) {
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300); // debounce de 300ms

    return () => clearTimeout(delayDebounce);
  }, [productQuery]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (customerQuery.length < 3) {
        setFilteredCustomers([]);
        return;
      }

      try {
        const customers = await searchCustomer({ query: customerQuery, slug });

        if (customers) {
          setFilteredCustomers(customers);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCustomers();
    }, 300); // debounce de 300ms

    return () => clearTimeout(delayDebounce);
  }, [customerQuery]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (memberQuery.length < 3) {
        setFilteredEmployees([]);
        return;
      }

      try {
        const employees = await searchEmployee({ query: memberQuery, slug });

        if (employees) {
          setFilteredEmployees(employees);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchEmployees();
    }, 300); // debounce de 300ms

    return () => clearTimeout(delayDebounce);
  }, [memberQuery]);

  const handleAddEmployee = (employee: Employee) => {
    setSelectedMembers((prev) => {
      const exists = prev.find((m) => m.id === employee.id);
      if (!exists) {
        return [...prev, { id: employee.id, name: employee.name }];
      }
      return prev;
    });
  };

  // Funções de manipulação de produtos
  const handleAddProduct = (product: Product) => {
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
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setSelected((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };

  const removeProduct = (productId: number) => {
    setSelected((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleSelectedClient = (customer: { id: string; name: string }) => {
    setSelectedClient(true);
    setCustomer(customer);
    setCustomerQuery(customer.name);
  };

  const resetForm = () => {
    setProductQuery("");
    setFilteredProducts([]);
    setSelected([]);
    setMemberQuery("");
    setSelectedMembers([]);
    setTotalCommissionPercent(0);
    setCustomerQuery("");
    setFilteredCustomers([]);
    setSelectedClient(false);
    setCustomer(null);
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append("blingProducts", JSON.stringify(selected));
    formData.append("members", JSON.stringify(selectedMembers));
    formData.append("commissionPercent", String(totalCommissionPercent));
    formData.append("customer", JSON.stringify(customer));

    const individualCommissions = selectedMembers.map((member) => ({
      memberId: member.id,
      value: totalCommissionPercent / selectedMembers.length,
    }));

    formData.append("memberCommissions", JSON.stringify(individualCommissions));

    const order = await createOrderAction({ formData, slug });

    if (order.success) {
      resetForm();
      setShowSuccessNotification(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  if (error) return <p>Erro ao carregar produtos</p>;

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ordens</h1>
        <Dialog
          onOpenChange={async (isOpen) => {
            if (!isOpen) {
              resetForm();
            }
          }}
        >
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
                <Input
                  id="customer-search"
                  placeholder="Digite para buscar..."
                  value={customerQuery}
                  onChange={(e) => setCustomerQuery(e.target.value)}
                  disabled={selectedClient}
                />

                {selectedClient ? (
                  <div className="mt-2 flex justify-between items-center bg-gray-100 py-2 pl-4 rounded">
                    <p className="text-sm text-gray-700">
                      Cliente: <strong>{customerQuery}</strong>
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => {
                        setSelectedClient(false);
                        setCustomerQuery("");
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                ) : (
                  <>
                    {filteredCustomers.length > 0 ? (
                      <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                        {filteredCustomers.map((customer) => (
                          <button
                            key={customer.id}
                            type="button"
                            onClick={() => {
                              handleSelectedClient(customer);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {customer.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      customerQuery && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Nenhum cliente encontrado.
                        </p>
                      )
                    )}
                  </>
                )}
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

              {/* Pesquisa de produto */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="product-search">Pesquisar produto</Label>
                <Input
                  id="product-search"
                  placeholder="Digite para buscar..."
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                />
                {filteredProducts ? (
                  <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          handleAddProduct(product);
                          setProductQuery("");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {product.nome}
                      </button>
                    ))}
                  </div>
                ) : (
                  productQuery && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Nenhum produto encontrado.
                    </p>
                  )
                )}
              </div>

              {/* Produtos selecionados */}
              <div className="flex flex-col gap-2">
                {selected.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 justify-between"
                  >
                    <span>{p.nome}</span>

                    <div className="flex">
                      <Input
                        type="number"
                        min={1}
                        value={p.quantity}
                        onChange={(e) =>
                          updateQuantity(p.id, Number(e.target.value))
                        }
                        className="w-20"
                      />
                      <Button
                        variant="ghost"
                        onClick={() => removeProduct(p.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Valor do pagamento */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentAmount">Valor do pagamento</Label>
                <Input name="paymentAmount" type="text" />
              </div>

              {/* Método de pagamento */}
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
                    <SelectItem value="DEPOSITO">Depósito</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comissão */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="total-commission-percent">
                  Valor Total da Comissão (%)
                </Label>
                <Input
                  id="total-commission-percent"
                  type="number"
                  value={totalCommissionPercent}
                  onChange={(e) =>
                    setTotalCommissionPercent(Number(e.target.value))
                  }
                  placeholder="Digite o valor percentual total"
                />
              </div>

              {/* Buscar Funcionário */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="commission-search">Funcionário</Label>
                <Input
                  id="commission-search"
                  placeholder="Digite para buscar..."
                  value={memberQuery}
                  onChange={(e) => setMemberQuery(e.target.value)}
                />
                {filteredEmployees.length > 0 ? (
                  <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                    {filteredEmployees.map((employee) => (
                      <button
                        key={employee.id}
                        type="button"
                        onClick={() => {
                          handleAddEmployee(employee);
                          setMemberQuery("");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {employee.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  memberQuery && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Nenhum funcionário encontrado.
                    </p>
                  )
                )}
              </div>

              {selectedMembers.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                  <Label>Comissões</Label>
                  {selectedMembers.map((member) => {
                    const individualCommission =
                      totalCommissionPercent / selectedMembers.length;
                    return (
                      <div
                        key={member.id}
                        className="flex gap-2 items-center justify-between"
                      >
                        <span>{member.name}</span>
                        <Input
                          type="number"
                          value={individualCommission}
                          readOnly
                          className="w-24"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col gap-4">
                {showSuccessNotification && (
                  <SuccessNotification message="Ordem de serviço criada com sucesso!" />
                )}

                <Button type="submit">Criar</Button>
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
          attachment={true}
        />
      </div>
    </div>
  );
}
