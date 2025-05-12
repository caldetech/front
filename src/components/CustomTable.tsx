"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FileCheck,
  FileX,
  Navigation,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";
import React, { useState } from "react";
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
import type { ProductResponse } from "@/schemas/products";
import type { ServiceResponse } from "@/schemas/services";

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
};

// ✅ Mapeamento de nomes das colunas por tabela
const columnNameMapping: Record<string, Record<string, string>> = {
  orders: {
    type: "Tipo",
    customer: "Cliente",
    payment: "Pagamento",
    status: "Status",
    customerType: "Categoria",
  },
};

// ✅ Mapeamento de valores por tabela e coluna
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
        <Badge color={"brown"} className="text-black">
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
}: CustomTableProps<T>) {
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
          key !== "serviceOrder"
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
  };

  const valueLabels = {
    SALE: "VENDA",
    BUDGET: "ORÇAMENTO",
    WARRANTY: "GARANTIA",
    COMPANY: "EMPRESA",
    PERSON: "PESSOAL",
  };

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
          <Badge color={"brown"} className="text-black">
            EMPRESA
          </Badge>
        );
      }
    }

    if (key === "customerType") {
      if (value === "PESSOAL") {
        return (
          <Badge color={"brown"} className="text-black">
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
                                  <FileCheck className="text-blue-500 size-4" />
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
                                  <FileX className="text-gray-500 size-4" />
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
                              <Eye className="size-4" />
                            </span>
                          </DialogTrigger>

                          <DialogContent className="w-[95vw] max-w-[640px] rounded-md">
                            <DialogHeader>
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
                                      key != "serviceOrder"
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
                                <table className="min-w-full text-sm">
                                  {Object.entries(productOrder).length > 0 ? (
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
                                            ([key, value]) =>
                                              key === "productOrder"
                                          )
                                          .flatMap(([key, value]) =>
                                            Array.isArray(value)
                                              ? value.map((element, idx) => (
                                                  <tr
                                                    className="border-t"
                                                    key={idx}
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
                                  ) : undefined}

                                  {Object.entries(serviceOrder).length > 0 ? (
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
                                            ([key, value]) =>
                                              key === "serviceOrder"
                                          )
                                          .flatMap(([key, value]) =>
                                            Array.isArray(value)
                                              ? value.map((element, idx) => (
                                                  <tr
                                                    className="border-t"
                                                    key={idx}
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
                                  ) : undefined}

                                  <tfoot>
                                    <tr className="border-t">
                                      <td colSpan={3} className="p-2">
                                        Total
                                      </td>
                                      <td className="text-right p-2 font-medium">
                                        wefwefwe
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
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
