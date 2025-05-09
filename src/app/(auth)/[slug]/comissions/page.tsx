"use client";

import CustomTable from "@/components/CustomTable";
import { useSlug } from "@/contexts/SlugContext";
import useAuthToken from "@/hooks/use-auth-token";
import { useCommissions } from "@/hooks/use-commissions";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const ITEMS_PER_PAGE = 5;

export default function Comissions() {
  const slug = useSlug();
  const [currentPage, setCurrentPage] = useState(1);
  const [token] = useAuthToken();
  const { data, total, isLoading, error } = useCommissions(
    currentPage,
    ITEMS_PER_PAGE,
    slug,
    token
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  if (error) return <p>Erro ao carregar funcionários</p>;

  return (
    <div className="flex flex-col gap-4 p-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Comissões</h1>
      </div>

      <div>
        <CustomTable
          data={data}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={total}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
