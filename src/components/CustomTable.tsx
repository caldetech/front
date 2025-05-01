"use client";

import { ChevronLeft, ChevronRight, Eye, FileCheck, FileX } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge"; // ✅ IMPORT DO BADGE
import FileUploader from "./FileUploader";
import Image from "next/image";

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
};

// ✅ Mapeamento de nomes das colunas por tabela
const columnNameMapping: Record<string, Record<string, string>> = {
  orders: {
    type: "Tipo",
    customer: "Cliente",
    payment: "Pagamento",
    status: "Status",
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
}: CustomTableProps<T>) {
  const columnNames = data?.length
    ? Object.keys(data[0]).filter(
        (key) =>
          key !== "id" &&
          key !== "orderAttachment" &&
          key !== "orderId" &&
          key !== "memberId"
      )
    : [];

  const [columnIndex, setColumnIndex] = useState(1);

  const totalPages = Math.ceil((totalItems ?? data.length) / itemsPerPage);

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
                console.log(item);

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

                      <span className="border border-[#EFEFEF] p-2 rounded-sm hover:bg-[#F3F4F6] cursor-pointer">
                        <Eye className="size-4" />
                      </span>
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
