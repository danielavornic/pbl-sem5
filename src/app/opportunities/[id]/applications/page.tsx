"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { applicationApi } from "@/api/applicationsApi";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import PublicLayout from "@/layouts/public";

import { columns } from "./components/columns";
import { ApplicationSheet } from "./components/sheet";

const ApplicationsPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationApi.getAllByOpportunityId(parseInt(params.id || "0")),
    select: (data) => {
      return Array.isArray(data) ? data : [];
    },
    enabled: true
  });

  return (
    <PublicLayout title={"Aplicatii"}>
      <main className="container py-8">
        <section>
          {isLoading ? (
            <Spinner className="pt-20" />
          ) : isError ? (
            <div className="font-semibold">Oportunitatea nu a fost găsită</div>
          ) : data ? (
            <>
              <Link href="/account/organization">
                <Button variant="link-foreground" className="h-auto px-0">
                  <ChevronLeft className="mr-2" size={20} />
                  Înapoi la organizația mea
                </Button>
              </Link>

              <h1 className="mb-10 mt-5 text-3xl font-semibold">
                Aplicații pentru{" "}
                <Link
                  href={`/opportunities/${params.id}`}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {data?.[0]?.opportunity?.title || "Oportunitate"}
                </Link>
              </h1>
              <DataTable columns={columns} data={data} />
              <ApplicationSheet />
            </>
          ) : null}
        </section>
      </main>
    </PublicLayout>
  );
};

export default ApplicationsPage;
