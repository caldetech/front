"use client";

import { createOrderAction } from "@/actions/create-order";
import CustomTable from "@/components/CustomTable";
import ErrorNotification from "@/components/ErrorNotification";
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
import useAuthToken from "@/hooks/use-auth-token";
import { useOrders } from "@/hooks/use-orders";
import { searchCustomer } from "@/http/search-customer";
import { searchEmployee } from "@/http/search-employee";
import { searchProduct } from "@/http/search-product";
import { searchService } from "@/http/search-service";
import { Customer } from "@/schemas/customer";
import { Employee } from "@/schemas/employee";
import { Product } from "@/schemas/products";
import type { Service } from "@/schemas/services";
import { useStore } from "@/stores/use-mutate";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { setMutate } = useStore();
  const [token] = useAuthToken();
  const { data, total, isLoading, error, mutate } = useOrders(
    currentPage,
    ITEMS_PER_PAGE,
    slug,
    token
  );
  const [serviceQuery, setServiceQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  useEffect(() => {
    setMutate(mutate);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (serviceQuery.length < 3) {
        setFilteredServices([]);
        return;
      }

      try {
        const services = await searchService({
          query: serviceQuery,
          slug,
          token,
        });

        if (services) {
          setFilteredServices(services);
        }
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [serviceQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productQuery.length < 3) {
        setFilteredProducts([]);
        return;
      }

      try {
        const products = await searchProduct({
          query: productQuery,
          slug,
          token,
        });

        if (products) {
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [productQuery]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (customerQuery.length < 3) {
        setFilteredCustomers([]);
        return;
      }

      try {
        const customers = await searchCustomer({
          query: customerQuery,
          slug,
          token,
        });

        if (customers) {
          setFilteredCustomers(customers);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCustomers();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [customerQuery]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (memberQuery.length < 3) {
        setFilteredEmployees([]);
        return;
      }

      try {
        const employees = await searchEmployee({
          query: memberQuery,
          slug,
          token,
        });

        if (employees) {
          setFilteredEmployees(employees);
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchEmployees();
    }, 300);

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
    setOrderType("");
    setPaymentMethod("");
    setSelectedServices([]);
    setServiceQuery("");
    setFilteredServices([]);
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append("blingProducts", JSON.stringify(selected));
    formData.append("members", JSON.stringify(selectedMembers));
    formData.append("commissionPercent", String(totalCommissionPercent));
    formData.append("customer", JSON.stringify(customer));
    formData.append("services", JSON.stringify(selectedServices));

    const individualCommissions = selectedMembers.map((member) => ({
      memberId: member.id,
      value: totalCommissionPercent / selectedMembers.length,
    }));

    formData.append("memberCommissions", JSON.stringify(individualCommissions));

    const order = await createOrderAction({ formData, slug, token });

    if (order.success) {
      resetForm();
      setShowSuccessNotification(true);
      await mutate();
    } else {
      setShowErrorNotification(true);
    }

    formData.delete("blingProducts");
    formData.delete("members");
    formData.delete("commissionPercent");
    formData.delete("customer");
    formData.delete("memberCommissions");
    formData.delete("paymentAmount");
    formData.delete("type");
    formData.delete("paymentMethod");
    formData.delete("services");
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
              setShowSuccessNotification(false);
              setShowErrorNotification(false);
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
                <Select
                  name="type"
                  value={orderType}
                  onValueChange={setOrderType}
                >
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

              {/* Lista de produtos adicionados */}
              {selected.length > 0 && (
                <div className="space-y-2">
                  {selected.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between border-b border-gray-200 pb-2"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {p.nome}
                      </span>

                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          value={p.quantity}
                          onChange={(e) =>
                            updateQuantity(p.id, Number(e.target.value))
                          }
                          className="w-16 h-8 px-2 py-1 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 h-8 px-2"
                          onClick={() => removeProduct(p.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pesquisa de serviços */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="service-search">Pesquisar serviço</Label>
                <Input
                  id="service-search"
                  placeholder="Digite para buscar..."
                  value={serviceQuery}
                  onChange={(e) => setServiceQuery(e.target.value)}
                />
                {filteredServices.length > 0 ? (
                  <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                    {filteredServices.map((service) => {
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            const exists = selectedServices.find(
                              (s) => s.id === service.id
                            );
                            if (!exists) {
                              setSelectedServices((prev) => [...prev, service]);
                            }
                            setServiceQuery("");
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {service.title}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  serviceQuery && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Nenhum serviço encontrado.
                    </p>
                  )
                )}
              </div>

              {/* Serviços selecionados */}
              {selectedServices.length > 0 && (
                <div className="flex flex-col gap-2">
                  <Label>Serviços selecionados</Label>
                  {selectedServices.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                    >
                      <span>{s.title}</span>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 h-8 px-2"
                        onClick={() =>
                          setSelectedServices((prev) =>
                            prev.filter((item) => item.id !== s.id)
                          )
                        }
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Valor do pagamento */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentAmount">Valor do pagamento</Label>
                <Input name="paymentAmount" type="text" />
              </div>

              {/* Método de pagamento */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentMethod">Método de pagamento</Label>
                <Select
                  name="paymentMethod"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
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

                {showErrorNotification && (
                  <ErrorNotification message="Erro ao criar a ordem de serviço!" />
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
          tableName="orders"
          navigation={true}
          module="orders"
        />
      </div>
    </div>
  );
}
