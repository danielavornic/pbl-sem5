import { DataTable } from "@/components/ui/data-table";
import data from "@/data/organizations.json";
import AdminLayout from "@/layouts/admin";

import { columns } from "./components/columns";

const OrganizationsPage = () => {
  return (
    <AdminLayout title="Organizații">
      <main className="pt-8">
        <DataTable columns={columns} data={data as any} />
      </main>
    </AdminLayout>
  );
};

export default OrganizationsPage;
