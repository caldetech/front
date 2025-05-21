"use client";

import { createOrderAction } from "@/actions/create-order";
import CustomTable from "@/components/CustomTable";
import { DateTimePicker } from "@/components/date-time-picker";
import ErrorNotification from "@/components/ErrorNotification";
import SuccessNotification from "@/components/SuccessNotification";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useSlug } from "@/contexts/SlugContext";
import { useUser } from "@/contexts/UserContext";
import useAuthToken from "@/hooks/use-auth-token";
import { useOrders } from "@/hooks/use-orders";
import { getValidAccessToken } from "@/http/get-valid-bling-tokens";
import { searchCustomer } from "@/http/search-customer";
import { searchEmployee } from "@/http/search-employee";
import { searchProduct } from "@/http/search-product";
import { searchService } from "@/http/search-service";
import { Customer } from "@/schemas/customer";
import { Employee } from "@/schemas/employee";
import { Product } from "@/schemas/products";
import type { Service } from "@/schemas/services";
import { useStore } from "@/stores/use-mutate";
import { Info, Lock, Plus, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
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
  const [orderType, setOrderType] = useState("SALE");
  const [paymentMethod, setPaymentMethod] = useState("PENDENTE");
  const { setMutate } = useStore();
  const [token] = useAuthToken();
  const fixedToken: string = token!;
  const user = useUser();
  const { data, total, isLoading, error, mutate } = useOrders(
    currentPage,
    ITEMS_PER_PAGE,
    slug,
    fixedToken,
    user.role,
    user.membership
  );
  const [serviceQuery, setServiceQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showOrder, setShowOrder] = useState<boolean>(true);
  const [service, setService] = useState<string | undefined>();
  const [note, setNote] = useState<string | undefined>();
  const [date, setDate] = useState<Date>(new Date());
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [blingConnection, setBlingConnection] = useState<boolean>(false);

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
          token: fixedToken,
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
          token: fixedToken,
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
          token: fixedToken,
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
          token: fixedToken,
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

  const removeEmployee = (employeeId: string) => {
    setSelectedMembers((prev) => prev.filter((p) => p.id !== employeeId));
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
    setOrderType("SALE");
    setPaymentMethod("PENDENTE");
    setSelectedServices([]);
    setServiceQuery("");
    setFilteredServices([]);
    setDate(new Date());
    setService(undefined);
    setNote(undefined);
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append("blingProducts", JSON.stringify(selected));
    formData.append("members", JSON.stringify(selectedMembers));
    formData.append("customer", JSON.stringify(customer));
    formData.append("showOrder", JSON.stringify(showOrder));
    formData.append("note", JSON.stringify(note));
    formData.append("service", JSON.stringify(service));
    formData.append("date", JSON.stringify(date));

    const order = await createOrderAction({
      formData,
      slug,
      token: fixedToken,
    });

    if (order.success) {
      resetForm();
      setShowSuccessNotification(true);
      await mutate();
    } else {
      setShowErrorNotification(true);
    }

    formData.delete("blingProducts");
    formData.delete("members");
    formData.delete("customer");
    formData.delete("paymentAmount");
    formData.delete("type");
    formData.delete("paymentMethod");
    formData.delete("service");
    formData.delete("note");
    formData.delete("date");
  };

  useEffect(() => {
    async function handleBlingAccessToken() {
      if (token) {
        const tokens = await getValidAccessToken({ slug, token });

        if (tokens !== undefined && !("success" in tokens)) {
          setBlingConnection(true);
        }
      }
    }

    handleBlingAccessToken();
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      setShowErrorNotification(false);
      setShowSuccessNotification(false);
    }, 3000);
  }, [showSuccessNotification, showErrorNotification]);

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
              {/* Visibilidade da ordem */}
              <div className="flex justify-between">
                <Label htmlFor="type">Publicar</Label>

                <Switch checked={showOrder} onCheckedChange={setShowOrder} />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="schedule">Agendamento</Label>

                <DateTimePicker date={date} setDate={setDate} />
              </div>

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
                <Label htmlFor="type">Tipo de ordem</Label>
                <Select
                  name="type"
                  value={orderType}
                  onValueChange={setOrderType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SALE">Serviço</SelectItem>
                    <SelectItem value="BUDGET">Orçamento</SelectItem>
                    <SelectItem value="WARRANTY">Garantia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pesquisa de produto */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {!blingConnection && (
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer" asChild>
                        <Info className="w-5 h-5 text-blue-600" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p>
                          Para pesquisar produtos é necessário fazer a
                          integração com o Bling.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  )}

                  <Label htmlFor="product-search">Pesquisar produto</Label>
                </div>
                <Input
                  id="product-search"
                  placeholder="Digite para buscar..."
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  disabled={!blingConnection}
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
                        className="w-full flex flex-col text-left px-4 py-2 hover:bg-gray-100 justify-between"
                      >
                        {product.nome}
                        <p className="text-red-500">
                          Preço: R$ {product.preco}
                        </p>
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
                      <span className="text-sm font-medium text-gray-800 pr-2">
                        <p>Produto: {p.nome}</p>

                        <p className="text-red-500 items-start">
                          Preço: R$ {p.preco}
                        </p>
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

              {/* Serviços */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="note">Descrição do serviço</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value) setService(e.target.value);
                  }}
                  required
                />
              </div>

              {/* Observação */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="note">Observação</Label>
                <Textarea
                  placeholder="Escreva sua mensagem aqui..."
                  onChange={(e) => {
                    if (e.target.value) setNote(e.target.value);
                  }}
                />
              </div>

              {/* Buscar Funcionário */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="commission-search">Funcionário designado</Label>
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
                <div className="flex flex-col gap-2">
                  {/* <Label>Comissões</Label> */}
                  {selectedMembers.map((member) => {
                    return (
                      <div
                        key={member.id}
                        className="flex gap-2 items-center justify-between"
                      >
                        <span>{member.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 h-8 px-2"
                          onClick={() => removeEmployee(member.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Método de pagamento */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentMethod">Método de pagamento</Label>
                <Select
                  name="paymentMethod"
                  defaultValue={paymentMethod}
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

              {/* Valor do pagamento */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="paymentAmount">Valor</Label>
                <Input
                  name="paymentAmount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  type="text"
                />
              </div>

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
          token={fixedToken}
          slug={slug}
        />
      </div>
    </div>
  );
}
