"use client";

import { useQuery } from "@tanstack/react-query";

import { opportunityApi } from "@/api/opportunityApi";
import { Spinner } from "@/components/spinner";
import { DataTable } from "@/components/ui/data-table";
import data from "@/data/opportunities.json";
import AdminLayout from "@/layouts/admin";

import { columns } from "./components/columns";
import { OpportunitySheet } from "./components/sheet";

const OpportunitiesPage = () => {
  const opportunitiesQuery = useQuery({
    queryKey: ["opportunities"],
    queryFn: opportunityApi.getAll
  });

  return (
    <AdminLayout title="Oportunități">
      <main className="pt-8">
        {opportunitiesQuery.isLoading ? (
          <Spinner className="mt-20" />
        ) : opportunitiesQuery.isSuccess && opportunitiesQuery.data ? (
          <DataTable columns={columns} data={opportunitiesQuery.data} />
        ) : (
          <div className="font-heading font-semibold">Eroare la încărcarea oporunităților</div>
        )}
      </main>

      <OpportunitySheet />
    </AdminLayout>
  );
};

export default OpportunitiesPage;
