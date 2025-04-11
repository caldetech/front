"use client";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

const ITEMS_PER_PAGE = 5;

type GenericRecord = {
  id: number;
  [key: string]: unknown;
};

type CustomTableProps<T extends GenericRecord> = {
  data: T[];
};

export default function CustomTable<T extends GenericRecord>({
  data,
}: CustomTableProps<T>) {
  const columnNames = data?.length
    ? Object.keys(data[0]).filter((key) => key !== "id")
    : [];

  const [count, setCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col">
      <table className="table-fixed border-x border-t border-[#EFEFEF] w-full">
        <thead>
          <tr className="border-b border-[#EFEFEF]">
            <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
              {columnNames[count - 1]?.[0].toUpperCase() +
                columnNames[count - 1]?.substring(1)}
            </th>
            <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
              {columnNames[count]?.[0].toUpperCase() +
                columnNames[count]?.substring(1)}
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
                    className={`${
                      count < columnNames.length - 1
                        ? "opacity-100"
                        : "opacity-20"
                    } size-4`}
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
          {paginatedItems.map((item, i) => {
            return (
              <tr className="border-b border-[#EFEFEF]" key={item.id}>
                <td className="p-2 text-xs text-left text-muted-foreground select-none">
                  {String(item[columnNames[count - 1]])}
                </td>

                <td className="p-2 text-xs text-left text-muted-foreground select-none">
                  {String(item[columnNames[count]])}
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
