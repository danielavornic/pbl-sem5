"use client";

import { DataTable } from "@/components/ui/data-table";
import data from "@/data/organizations.json";
import AdminLayout from "@/layouts/admin";

import { columns } from "./components/columns";
import { OrganizationSheet } from "./components/sheet";

const OrganizationsPage = () => {
  return (
    <AdminLayout title="Organizații">
      <main className="pt-8">
        <DataTable columns={columns} data={data as any} />
      </main>

      <OrganizationSheet />
    </AdminLayout>
  );
};

export default OrganizationsPage;
