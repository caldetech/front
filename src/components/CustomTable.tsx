"use client";

import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Eye,
  EyeOff,
  FileCheck,
  FileX,
  Fullscreen,
  Image as ImageIcon,
  ImageOff,
  Navigation,
  SquarePen,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge"; // ✅ IMPORT DO BADGE
import FileUploader from "./FileUploader";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { parseBRL } from "@/lib/currency";
import type { Product, ProductResponse } from "@/schemas/products";
import type { Service, ServiceResponse } from "@/schemas/services";
import { useStore } from "@/stores/use-mutate";
import { setShowOrder } from "@/http/set-show-order";
import { Can } from "./Can";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Customer } from "@/schemas/customer";
import type { Employee } from "@/schemas/employee";
import { useSlug } from "@/contexts/SlugContext";
import { searchService } from "@/http/search-service";
import { createOrderAction } from "@/actions/create-order";
import { searchEmployee } from "@/http/search-employee";
import { searchCustomer } from "@/http/search-customer";
import { searchProduct } from "@/http/search-product";
import { updateOrderAction } from "@/actions/update-order";

export type GenericRecord = {
  id: string;
  [key: string]: unknown;
};

type CustomTableProps<T extends GenericRecord> = {
  data: T[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems?: number;
  attachment?: boolean;
  tableName?: string;
  navigation?: boolean;
  module: string;
  token: string;
  slug: string;
};

const columnNameMapping: Record<string, Record<string, string>> = {
  orders: {
    type: "Tipo",
    customer: "Cliente",
    payment: "Pagamento",
    status: "Status",
    customerType: "Categoria",
  },
};

const valueMapping: Record<
  string,
  Record<string, Record<string, React.ReactNode>>
> = {
  orders: {
    status: {
      OPEN: (
        <Badge color="green" variant="secondary">
          Aberto
        </Badge>
      ),
      CLOSED: <Badge variant="secondary">Fechado</Badge>,
      CANCELLED: <Badge variant="secondary">Cancelado</Badge>,
    },
    type: {
      SALE: (
        <Badge variant="secondary" color="orange">
          Venda
        </Badge>
      ),
      BUDGET: (
        <Badge variant="secondary" color="cyan">
          Orçamento
        </Badge>
      ),
      WARRANTY: <Badge variant="secondary">Garantia</Badge>,
    },
    payment: {
      PENDING: (
        <Badge variant="secondary" color="yellow">
          Pendente
        </Badge>
      ),
      RECEIVED: <Badge variant="secondary">Recebido</Badge>,
      CANCELLED: <Badge variant="secondary">Cancelado</Badge>,
    },
    customerType: {
      COMPANY: (
        <Badge color={"blue"} className="text-black">
          Empresa
        </Badge>
      ),
      PERSON: (
        <Badge color={"red"} className="text-black">
          Pessoal
        </Badge>
      ),
    },
  },
};

function getColumnLabel(table: string | undefined, column: string): string {
  return (
    columnNameMapping[table ?? ""]?.[column] ??
    column.charAt(0).toUpperCase() + column.slice(1)
  );
}

function getCellValue(
  table: string | undefined,
  column: string,
  value: unknown
): React.ReactNode {
  const mapping = valueMapping[table ?? ""]?.[column];
  if (mapping && typeof value === "string" && mapping[value]) {
    return mapping[value];
  }

  return value as React.ReactNode;
}

export default function CustomTable<T extends GenericRecord>({
  data,
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
  attachment = false,
  tableName,
  navigation = false,
  module,
  token,
  slug,
}: CustomTableProps<T>) {
  const [productQuery, setProductQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const [selectedMembers, setSelectedMembers] = useState<
    { id: string; name: string; percentage?: number }[]
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
  const [orderType, setOrderType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [orderVisibility, setOrderVisibility] = useState<boolean | undefined>();
  const [openMainDialog, setOpenMainDialog] = useState<boolean | undefined>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean | undefined>();
  const [paymentAmount, setPaymentAmount] = useState<number | undefined>();
  const [singleCommission, setSingleCommission] = useState<
    number | undefined
  >();
  const [orderId, setOrderId] = useState<string | undefined>();

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
    formData.append("showOrder", JSON.stringify(orderVisibility));

    const individualCommissions = selectedMembers.map((member) => ({
      memberId: member.id,
      value: totalCommissionPercent / selectedMembers.length,
    }));

    formData.append("memberCommissions", JSON.stringify(individualCommissions));

    const order = await updateOrderAction({ formData, slug, token, orderId });

    if (order.success) {
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

  const columnNames = data?.length
    ? Object.keys(data[0]).filter(
        (key) =>
          key !== "id" &&
          key !== "orderAttachment" &&
          key !== "orderId" &&
          key !== "memberId" &&
          key !== "address" &&
          key !== "productOrder" &&
          key !== "assignedMembers" &&
          key !== "orderNumber" &&
          key !== "serviceOrder" &&
          key !== "createdAt" &&
          key !== "amount" &&
          key !== "show" &&
          key !== "method" &&
          key !== "customerId"
      )
    : [];

  const [columnIndex, setColumnIndex] = useState(1);

  const totalPages = Math.ceil((totalItems ?? data.length) / itemsPerPage);

  function getUrlNavigation(address: string) {
    const addressName = address.split(",")[0];
    const addressNumber = address.split(",")[1].trim();

    return `https://www.google.com/maps?q=${addressName},+${addressNumber},+Sertãozinho,+SP`;
  }

  const keyLabels = {
    type: "Tipo",
    customer: "Cliente",
    address: "Endereço",
    assignedMembers: "Funcionários",
    customerType: "Categoria",
    method: "Pagamento",
  };

  const valueLabels = {
    SALE: "VENDA",
    BUDGET: "ORÇAMENTO",
    WARRANTY: "GARANTIA",
    COMPANY: "EMPRESA",
    PERSON: "PESSOAL",
    PIX: "PIX",
    CARTAO: "Cartão",
    BOLETO: "Boleto",
    DINHEIRO: "Dinheiro",
    DEPOSITO: "Depósito",
    PENDENTE: "Pendente",
  };

  const { mutate } = useStore();

  function formatValue(key: unknown, value: unknown) {
    if (key === "type") {
      if (value === "VENDA") {
        return (
          <Badge color={"orange"} className="text-black">
            VENDA
          </Badge>
        );
      }
      if (value === "GARANTIA") {
        return (
          <Badge variant={"secondary"} className="text-black">
            GARANTIA
          </Badge>
        );
      }
      if (value === "ORÇAMENTO") {
        return (
          <Badge color={"cyan"} className="text-black">
            ORÇAMENTO
          </Badge>
        );
      }
      if (value === "EMPRESA") {
        return (
          <Badge color={"blue"} className="text-black">
            EMPRESA
          </Badge>
        );
      }
      if (value === "PESSOAL") {
        return (
          <Badge color={"red"} className="text-black">
            PESSOAL
          </Badge>
        );
      }
    }

    if (key === "customerType") {
      if (value === "PESSOAL") {
        return (
          <Badge color={"red"} className="text-black">
            PESSOAL
          </Badge>
        );
      }
      if (value === "EMPRESA") {
        return (
          <Badge color={"blue"} className="text-black">
            EMPRESA
          </Badge>
        );
      }
    }

    return String(value);
  }

  function calculateOrderPrice(
    productOrder: ProductResponse,
    serviceOrder: ServiceResponse
  ) {
    const productTotal = Array.isArray(productOrder)
      ? productOrder.reduce((total, item) => {
          const price = Number(item.price) || 0;
          const quantity = Number(item.quantity) || 0;
          return total + price * quantity;
        }, 0)
      : 0;

    const serviceTotal = Array.isArray(serviceOrder)
      ? serviceOrder.reduce((total, item) => {
          const price = Number(item.price) || 0;
          return total + price;
        }, 0)
      : 0;

    return (productTotal + serviceTotal).toFixed(2);
  }

  async function handleShowOrder({
    orderId,
    token,
    showOrder,
  }: {
    orderId: string;
    token: string;
    showOrder: boolean;
  }) {
    if (!token) {
      throw new Error("Há dados ausentes!");
    }

    setShowOrder({ orderId, token, showOrder: !showOrder });

    await mutate();
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col">
          <table className="table-fixed border-x border-t border-[#EFEFEF] w-full">
            <thead>
              <tr className="border-b border-[#EFEFEF]">
                <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
                  {getColumnLabel(
                    tableName,
                    columnNames[columnIndex - 1] ?? ""
                  )}
                </th>
                <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
                  {getColumnLabel(tableName, columnNames[columnIndex] ?? "")}
                </th>
                <th className="w-1/3 p-2">
                  <div className="flex gap-2 justify-end">
                    <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                      <ChevronLeft
                        className={`${
                          columnIndex === 1 ? "opacity-20" : "opacity-100"
                        } size-4`}
                        onClick={() => {
                          if (columnIndex > 1) setColumnIndex(columnIndex - 1);
                        }}
                      />
                    </span>
                    <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                      <ChevronRight
                        className={`${
                          columnIndex < columnNames.length - 1
                            ? "opacity-100"
                            : "opacity-20"
                        } size-4`}
                        onClick={() => {
                          if (columnIndex < columnNames.length - 1)
                            setColumnIndex(columnIndex + 1);
                        }}
                      />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => {
                const productOrder = item?.productOrder as ProductResponse;
                const serviceOrder = item?.serviceOrder as ServiceResponse;
                const address = item?.address as string;
                const orderNumber = item?.orderNumber as number;
                const orderPrice = item.amount as number;
                const showOrder = item.show as boolean;
                const orderId = item.id as string;

                return (
                  <tr className="border-b border-[#EFEFEF]" key={item.id}>
                    <td className="p-2 text-xs text-left text-muted-foreground select-none">
                      {getCellValue(
                        tableName,
                        columnNames[columnIndex - 1],
                        item[columnNames[columnIndex - 1]]
                      )}
                    </td>

                    <td className="p-2 text-xs text-left text-muted-foreground select-none">
                      {getCellValue(
                        tableName,
                        columnNames[columnIndex],
                        item[columnNames[columnIndex]]
                      )}
                    </td>

                    <td className="flex justify-end m-2 gap-1">
                      {attachment ? (
                        <>
                          {Array.isArray(item.orderAttachment) &&
                          item.orderAttachment.length > 0 ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="border border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer">
                                  <ImageIcon className="text-blue-500 size-4" />
                                </span>
                              </DialogTrigger>

                              <DialogContent className="flex flex-col items-center">
                                <div className="flex flex-col items-center gap-4">
                                  <DialogTitle>Anexar ordem</DialogTitle>

                                  <div className="relative w-full h-100">
                                    {" "}
                                    {/* Ajuste o tamanho conforme seu layout */}
                                    <Image
                                      src={item.orderAttachment[0].url}
                                      alt="Visualização do anexo"
                                      fill
                                      className="object-cover rounded-md"
                                    />
                                  </div>
                                  <FileUploader orderId={item.id} />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="border border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer">
                                  <ImageOff className="text-gray-500 size-4" />
                                </span>
                              </DialogTrigger>
                              <DialogContent className="flex flex-col items-center">
                                <DialogTitle>Anexar ordem</DialogTitle>
                                <FileUploader orderId={item.id} />
                              </DialogContent>
                            </Dialog>
                          )}
                        </>
                      ) : null}

                      {navigation && (
                        <span className="border border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer">
                          <a href={getUrlNavigation(address)} target="_blank">
                            <Navigation className="size-4" />
                          </a>
                        </span>
                      )}

                      {module === "orders" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="border border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer">
                              <Expand className="size-4" />
                            </span>
                          </DialogTrigger>

                          <DialogContent className="w-[95vw] max-w-[640px] rounded-md">
                            <div className="absolute top-4 left-4 flex gap-2">
                              <Can I="editVisibility" a="Order">
                                {showOrder ? (
                                  <span
                                    onClick={() =>
                                      handleShowOrder({
                                        orderId,
                                        token,
                                        showOrder,
                                      })
                                    }
                                    className="border text-blue-500 border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer"
                                  >
                                    <Eye className="size-4" />
                                  </span>
                                ) : (
                                  <span
                                    onClick={() =>
                                      handleShowOrder({
                                        orderId,
                                        token,
                                        showOrder,
                                      })
                                    }
                                    className="border text-red-500 border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer"
                                  >
                                    <EyeOff className="size-4" />
                                  </span>
                                )}
                              </Can>

                              {/* MODAL DE EDIÇÃO */}
                              <Dialog
                                onOpenChange={() => {
                                  setShowSuccessNotification(false);
                                  setShowErrorNotification(false);
                                }}
                              >
                                <DialogTrigger
                                  onClick={() => {
                                    setSelectedClient(true);
                                    setCustomerQuery(item.customer as string);
                                    setCustomer({
                                      id: item.customerId as string,
                                      name: item.customer as string,
                                    });
                                    setOrderType(item.type as string);

                                    type Product = {
                                      blingId: bigint;
                                      costPrice: number;
                                      price: number;
                                      productName: string;
                                      quantity: number;
                                    };

                                    const productsTransformed = (
                                      item.productOrder as Product[]
                                    ).map((p) => ({
                                      id: Number(p.blingId),
                                      nome: p.productName,
                                      preco: p.price,
                                      precoCusto: p.costPrice,
                                      quantity: p.quantity,
                                      codigo: "",
                                      tipo: "",
                                      situacao: "",
                                      formato: "",
                                      descricaoCurta: "",
                                      imagemURL: "",
                                      estoque: undefined,
                                    }));

                                    setSelected(productsTransformed);

                                    type Service = {
                                      id: string;
                                      title: string;
                                      description: string;
                                      price: number;
                                      organizationId: string;
                                      createdAt: Date;
                                      updatedAt: Date;
                                    };

                                    setSelectedServices(
                                      item.serviceOrder as Service[]
                                    );

                                    setPaymentAmount(item.amount as number);

                                    setPaymentMethod(item.method as string);

                                    setSelectedMembers(
                                      (
                                        item.assignedMembers as {
                                          memberId: string;
                                          memberName: string;
                                          percentage: number;
                                        }[]
                                      ).map((m) => ({
                                        id: m.memberId,
                                        name: m.memberName,
                                        percentage: m.percentage, // incluir o valor da comissão
                                      }))
                                    );

                                    setOrderVisibility(item.show as boolean);

                                    setOrderId(item.id as string);
                                  }}
                                  asChild
                                >
                                  <span className="border border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer">
                                    <SquarePen className="size-4" />
                                  </span>
                                </DialogTrigger>

                                <DialogContent className="max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Editar ordem de serviço
                                    </DialogTitle>
                                  </DialogHeader>

                                  <form
                                    className="flex flex-col gap-4"
                                    action={handleSubmit}
                                  >
                                    {/* <div className="flex justify-between">
                                      <Label htmlFor="type">Publicar</Label>

                                      <Switch
                                        checked={showOrder}
                                        onCheckedChange={(checked) =>
                                          setOrderVisibility(checked)
                                        }
                                      />
                                    </div> */}

                                    {/* Cliente */}
                                    <div className="flex flex-col gap-1">
                                      <Label htmlFor="customerId">
                                        Cliente
                                      </Label>
                                      <Input
                                        id="customer-search"
                                        placeholder="Digite para buscar..."
                                        value={customerQuery}
                                        onChange={(e) =>
                                          setCustomerQuery(e.target.value)
                                        }
                                        disabled={selectedClient}
                                      />
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
                                          <SelectItem value="SALE">
                                            Venda
                                          </SelectItem>
                                          <SelectItem value="BUDGET">
                                            Orçamento
                                          </SelectItem>
                                          <SelectItem value="WARRANTY">
                                            Garantia
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {/* Pesquisa de produto */}
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="product-search">
                                        Pesquisar produto
                                      </Label>
                                      <Input
                                        id="product-search"
                                        placeholder="Digite para buscar..."
                                        value={productQuery}
                                        onChange={(e) =>
                                          setProductQuery(e.target.value)
                                        }
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
                                                  updateQuantity(
                                                    p.id,
                                                    Number(e.target.value)
                                                  )
                                                }
                                                className="w-16 h-8 px-2 py-1 text-sm"
                                              />
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-700 h-8 px-2"
                                                onClick={() =>
                                                  removeProduct(p.id)
                                                }
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
                                      <Label htmlFor="service-search">
                                        Pesquisar serviço
                                      </Label>
                                      <Input
                                        id="service-search"
                                        placeholder="Digite para buscar..."
                                        value={serviceQuery}
                                        onChange={(e) =>
                                          setServiceQuery(e.target.value)
                                        }
                                      />
                                      {filteredServices.length > 0 ? (
                                        <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                                          {filteredServices.map((service) => {
                                            return (
                                              <button
                                                key={service.id}
                                                type="button"
                                                onClick={() => {
                                                  const exists =
                                                    selectedServices.find(
                                                      (s) => s.id === service.id
                                                    );
                                                  if (!exists) {
                                                    setSelectedServices(
                                                      (prev) => [
                                                        ...prev,
                                                        service,
                                                      ]
                                                    );
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
                                                  prev.filter(
                                                    (item) => item.id !== s.id
                                                  )
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
                                      <Label htmlFor="paymentAmount">
                                        Valor do pagamento
                                      </Label>
                                      <Input
                                        name="paymentAmount"
                                        value={paymentAmount}
                                        onChange={(e) =>
                                          setPaymentAmount(
                                            parseBRL(e.target.value)
                                          )
                                        }
                                      />
                                    </div>

                                    {/* Método de pagamento */}
                                    <div className="flex flex-col gap-1">
                                      <Label htmlFor="paymentMethod">
                                        Método de pagamento
                                      </Label>
                                      <Select
                                        name="paymentMethod"
                                        value={paymentMethod}
                                        onValueChange={setPaymentMethod}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="PIX">
                                            PIX
                                          </SelectItem>
                                          <SelectItem value="CARTAO">
                                            Cartão
                                          </SelectItem>
                                          <SelectItem value="BOLETO">
                                            Boleto
                                          </SelectItem>
                                          <SelectItem value="DEPOSITO">
                                            Depósito
                                          </SelectItem>
                                          <SelectItem value="PENDENTE">
                                            Pendente
                                          </SelectItem>
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
                                          setTotalCommissionPercent(
                                            Number(e.target.value)
                                          )
                                        }
                                        placeholder="Digite o valor percentual total"
                                      />
                                    </div>

                                    {/* Buscar Funcionário */}
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="commission-search">
                                        Funcionário
                                      </Label>
                                      <Input
                                        id="commission-search"
                                        placeholder="Digite para buscar..."
                                        value={memberQuery}
                                        onChange={(e) =>
                                          setMemberQuery(e.target.value)
                                        }
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
                                          const hasTotalCommission =
                                            !!totalCommissionPercent;

                                          // Se tiver um valor total definido, dividir igualmente
                                          const individualCommission =
                                            hasTotalCommission
                                              ? totalCommissionPercent /
                                                selectedMembers.length
                                              : (member.percentage ?? 0); // senão, usa a amount do banco

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
                                        <SuccessNotification message="Atualização bem sucedida!" />
                                      )}

                                      {showErrorNotification && (
                                        <ErrorNotification message="Erro ao atualizar!" />
                                      )}

                                      <Button type="submit">Atualizar</Button>
                                    </div>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </div>

                            <DialogHeader className="flex items-center">
                              <DialogTitle>
                                Ordem n°:{" "}
                                {orderNumber.toString().length === 1
                                  ? `00${orderNumber}`
                                  : `${orderNumber}`}
                              </DialogTitle>
                              <DialogDescription>
                                Detalhes da ordem
                              </DialogDescription>
                            </DialogHeader>

                            <div className="max-h-[60vh] overflow-y-auto mt-4 space-y-6">
                              {/* Informações do pedido */}
                              <div className="space-y-4">
                                {Object.entries(item)
                                  .filter(
                                    ([key, value]) =>
                                      key != "id" &&
                                      key != "orderAttachment" &&
                                      key != "payment" &&
                                      key != "status" &&
                                      key != "productOrder" &&
                                      key != "orderNumber" &&
                                      key != "serviceOrder" &&
                                      key != "amount" &&
                                      key != "show" &&
                                      key != "customerId"
                                  )
                                  .map(([key, value], index) => {
                                    if (
                                      key === "assignedMembers" &&
                                      Array.isArray(value)
                                    ) {
                                      return (
                                        <div
                                          key={key}
                                          className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2"
                                        >
                                          <p className="text-muted-foreground text-sm">
                                            {key in keyLabels
                                              ? keyLabels[
                                                  key as keyof typeof keyLabels
                                                ]
                                              : key}
                                          </p>

                                          <div className="flex gap-4 justify-end">
                                            {value.map((element, idx) => (
                                              <p
                                                key={idx}
                                                className="text-right"
                                              >
                                                <Badge variant={"secondary"}>
                                                  {element.memberName}
                                                </Badge>
                                              </p>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <div
                                        key={key}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2"
                                      >
                                        <p className="text-muted-foreground text-sm">
                                          {key in keyLabels
                                            ? keyLabels[
                                                key as keyof typeof keyLabels
                                              ]
                                            : key}
                                        </p>
                                        <p className="text-right">
                                          {String(value) in valueLabels
                                            ? formatValue(
                                                key,
                                                valueLabels[
                                                  String(
                                                    value
                                                  ) as keyof typeof valueLabels
                                                ]
                                              )
                                            : String(value)}
                                        </p>
                                      </div>
                                    );
                                  })}
                              </div>

                              {/* Tabela de produtos */}
                              <div className="overflow-x-auto">
                                {Object.entries(productOrder).length > 0 ||
                                Object.entries(serviceOrder).length > 0 ? (
                                  <table className="min-w-full text-sm">
                                    {Object.entries(productOrder).length >
                                      0 && (
                                      <>
                                        <thead>
                                          <tr>
                                            <th className="text-left p-2">
                                              Produto
                                            </th>
                                            <th className="text-right p-2">
                                              Qtd.
                                            </th>
                                            <th className="text-right p-2">
                                              Preço
                                            </th>
                                            <th className="text-right p-2">
                                              Subtotal
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {Object.entries(item)
                                            .filter(
                                              ([key]) => key === "productOrder"
                                            )
                                            .flatMap(([_, value]) =>
                                              Array.isArray(value)
                                                ? value.map((element, idx) => (
                                                    <tr
                                                      className="border-t"
                                                      key={`product-${idx}`}
                                                    >
                                                      <td className="p-2 break-words whitespace-normal max-w-[160px] sm:max-w-none">
                                                        {element.productName}
                                                      </td>
                                                      <td className="text-right p-2">
                                                        {element.quantity}
                                                      </td>
                                                      <td className="text-right p-2">
                                                        {element.price}
                                                      </td>
                                                      <td className="text-right p-2">
                                                        {parseFloat(
                                                          (
                                                            element.price *
                                                            element.quantity
                                                          ).toString()
                                                        )}
                                                      </td>
                                                    </tr>
                                                  ))
                                                : []
                                            )}
                                        </tbody>
                                      </>
                                    )}

                                    {Object.entries(serviceOrder).length >
                                      0 && (
                                      <>
                                        <thead>
                                          <tr>
                                            <th className="text-left p-2">
                                              Serviço
                                            </th>
                                            <th className="text-right p-2"></th>
                                            <th className="text-right p-2"></th>
                                            <th className="text-right p-2">
                                              Subtotal
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {Object.entries(item)
                                            .filter(
                                              ([key]) => key === "serviceOrder"
                                            )
                                            .flatMap(([_, value]) =>
                                              Array.isArray(value)
                                                ? value.map((element, idx) => (
                                                    <tr
                                                      className="border-t"
                                                      key={`service-${idx}`}
                                                    >
                                                      <td className="p-2 break-words whitespace-normal max-w-[160px] sm:max-w-none">
                                                        {element.title}
                                                      </td>
                                                      <td className="text-right p-2"></td>
                                                      <td className="text-right p-2"></td>
                                                      <td className="text-right p-2">
                                                        {element.price}
                                                      </td>
                                                    </tr>
                                                  ))
                                                : []
                                            )}
                                        </tbody>
                                      </>
                                    )}

                                    <tfoot>
                                      <tr className="border-t">
                                        <td
                                          colSpan={3}
                                          className="p-2 font-bold"
                                        >
                                          Total
                                        </td>
                                        <td className="text-right p-2 font-bold">
                                          {orderPrice}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                ) : (
                                  <div className="w-full p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
                                    <p className="text-lg font-semibold">
                                      Nenhum produto ou serviço adicionado
                                    </p>
                                    <p className="text-sm mt-1">
                                      Adicione itens para visualizar os detalhes
                                      do pedido.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination>
            <PaginationContent className="justify-end">
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(Math.max(1, currentPage - 1));
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <span className="text-xs text-muted-foreground px-2">
                  Página {currentPage}
                  {totalPages &&
                    ` de ${currentPage > totalPages ? currentPage : totalPages}`}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <p className="text-center table-fixed border-x border border-[#EFEFEF] w-full p-2">
          Nenhum resultado encontrado.
        </p>
      )}
    </>
  );
}
