import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import mockData from "@/data/applications.json";
import PublicLayout from "@/layouts/public";

import { columns } from "./components/columns";
import { ApplicationSheet } from "./components/sheet";

const ApplicationsPage = () => {
  return (
    <PublicLayout title={"Aplicatii"}>
      <main className="container py-8">
        <section>
          <Link href="/account/organization">
            <Button variant="link-foreground" className="h-auto px-0">
              <ChevronLeft className="mr-2" size={20} />
              Înapoi la organizația mea
            </Button>
          </Link>

          <h1 className="mb-10 mt-5 text-3xl font-semibold">
            Aplicații pentru{" "}
            <Link
              href="/opportunities/1"
              className="text-accent underline-offset-4 hover:underline"
            >
              Opportunity title
            </Link>
          </h1>
          <DataTable columns={columns} data={mockData} />
          <ApplicationSheet />
        </section>
      </main>
    </PublicLayout>
  );
};

export default ApplicationsPage;
