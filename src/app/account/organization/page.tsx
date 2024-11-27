"use client";

import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { opportunityApi } from "@/api/opportunityApi";
import { organizationApi } from "@/api/organizationApi";
import { useAuth } from "@/app/auth/use-auth";
import OpportunityCard from "@/app/opportunities/components/opportunity-card";
import { OrganizationOverview } from "@/app/organizations/[id]/components/organization-overview";
import OrganizationCard from "@/app/organizations/components/organization-card";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/public";
import { Organization } from "@/types";

import OwnerOpportunityCard from "../components/owner-opportunity-card";

const MyOrganizationPage = () => {
  const { user } = useAuth();

  const organizationId =
    user && "createdOrganizations" in user ? user.createdOrganizations?.[0] : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization", { id: organizationId }],
    queryFn: () => organizationApi.getById(organizationId as number),
    enabled: !!organizationId
  });

  const opportunityQuery = useQuery({
    queryKey: ["org-opportunities", { orgId: organizationId }],
    queryFn: () => opportunityApi.getAllByOrganizationId(organizationId as number),
    select: (data) => {
      return Array.isArray(data) ? data : [];
    },
    enabled: typeof organizationId === "number"
  });

  if (!organizationId) {
    return (
      <PublicLayout title="Setări">
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
    <PublicLayout title="Setări">
      <main className="container h-full py-10">
        {isLoading ? (
          <Spinner className="pt-20" />
        ) : isError ? (
          <div className="font-semibold">Organizația nu a fost găsită</div>
        ) : (
          <>
            <section>
              <h1 className="mb-10 text-3xl font-semibold">Organizația mea</h1>
              <OrganizationOverview organization={data as unknown as Organization} hasOptions />
            </section>

            <section className="pt-20">
              <div className="flex w-full justify-between">
                <h2 className="mb-10 text-3xl font-semibold">Evenimentele create</h2>

                <Button asChild>
                  <Link href="/opportunities/create" className="flex items-center">
                    <PlusIcon className="mr-2 h-6 w-6" />
                    Adaugă
                  </Link>
                </Button>
              </div>
              {opportunityQuery.isLoading ? (
                <Spinner className="mt-32" />
              ) : opportunityQuery.isSuccess ? (
                <div className="grid grid-cols-3 gap-6">
                  {opportunityQuery.data.map((opportunity: any) => (
                    <OwnerOpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
                </div>
              ) : (
                <div className="font-heading font-semibold">
                  Nu ai creat încă nicio oportunitate.
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </PublicLayout>
  );
};

export default MyOrganizationPage;
