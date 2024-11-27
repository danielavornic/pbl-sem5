"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationApi } from "@/api/organizationApi";
import { useAuth } from "@/app/auth/use-auth";
import { Spinner } from "@/components/spinner";
import PublicLayout from "@/layouts/public";
import { Organization } from "@/types";

import CreateOpportunityForm from "./components/form";

const CreateOpportunityPage = () => {
  const { user } = useAuth();

  const organizationId =
    user && "createdOrganizations" in user ? user.createdOrganizations?.[0] : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization", { id: organizationId }],
    queryFn: () => organizationApi.getById(organizationId as number),
    enabled: !!organizationId
  });

  if (!organizationId) {
    return (
      <PublicLayout title="Creează o oportunitate">
        <main className="container h-full py-10">
          <section>
            <h1 className="text-3xl font-semibold">Organizația mea</h1>
            <p>Nu ai creat încă nicio organizație.</p>
          </section>
        </main>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout title="Creează o oportunitate">
      <main
        className="container flex w-full items-start justify-center gap-[8vw] py-9"
        suppressHydrationWarning
      >
        {isLoading ? (
          <Spinner className="pt-20" />
        ) : data ? (
          <CreateOpportunityForm organization={data as Organization} />
        ) : isError ? (
          <p>Eroare la încărcarea datelor</p>
        ) : null}
      </main>
    </PublicLayout>
  );
};

export default CreateOpportunityPage;
