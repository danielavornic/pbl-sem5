"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationApi } from "@/api/organizationApi";
import { Spinner } from "@/components/spinner";
import { DataTable } from "@/components/ui/data-table";
import AdminLayout from "@/layouts/admin";

import { columns } from "./components/columns";
import { OrganizationSheet } from "./components/sheet";

const OrganizationsPage = () => {
  const organizationQuery = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationApi.getAll
  });

  return (
    <AdminLayout title="Organizații">
      <main className="pt-8">
        {organizationQuery.isLoading ? (
          <Spinner className="mt-20" />
        ) : organizationQuery.isSuccess && organizationQuery.data ? (
          <DataTable columns={columns} data={organizationQuery.data} />
        ) : (
          <div className="font-heading font-semibold">Eroare la încărcarea organizațiilor</div>
        )}
      </main>

      <OrganizationSheet />
    </AdminLayout>
  );
};

export default OrganizationsPage;
