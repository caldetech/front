"use client";

import { employees } from "@/data/employees";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";

const ITEMS_PER_PAGE = 5;

export default function CustomTable() {
  const columnNames = employees?.length
    ? Object.keys(employees[0]).filter((key) => key !== "id")
    : [];
  const [count, setCount] = useState<number>(1); // controle das colunas visíveis
  const [currentPage, setCurrentPage] = useState(1); // controle de páginas

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col">
      <table className="table-fixed border-x border-t border-[#EFEFEF] w-full">
        <thead>
          <tr className="border-b border-[#EFEFEF]">
            <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
              {columnNames[count - 1][0].toUpperCase() +
                columnNames[count - 1].substr(1)}
            </th>
            <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
              {columnNames[count][0].toUpperCase() +
                columnNames[count].substr(1)}
            </th>

            <th className="w-1/3 p-2">
              <div className="flex gap-2 justify-end">
                <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                  <ChevronLeft
                    className={`${count === 1 ? "opacity-20" : "opacity-100"} size-4`}
                    onClick={() => {
                      if (count > 1) setCount(count - 1);
                    }}
                  />
                </span>

                <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                  <ChevronRight
                    className={`${count < columnNames.length - 1 ? "opacity-100" : "opacity-20"} size-4`}
                    onClick={() => {
                      if (count < columnNames.length - 1) setCount(count + 1);
                    }}
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedEmployees.map((e, i) => {
            return (
              <tr className="border-b border-[#EFEFEF]" key={i}>
                <td className="p-2 text-xs text-left text-muted-foreground select-none">
                  {e[columnNames[count - 1] as keyof typeof e]}
                </td>
                <td className="p-2 text-xs text-left text-muted-foreground select-none">
                  {e[columnNames[count] as keyof typeof e]}
                </td>
                <td className="flex justify-end">
                  <span className="border border-[#EFEFEF] p-2 rounded-sm m-2 hover:bg-[#F3F4F6] cursor-pointer">
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
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-xs text-muted-foreground px-2">
              Página {currentPage} de {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
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
  );
}
