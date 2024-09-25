"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationApi } from "@/api/organizationApi";
import { Spinner } from "@/components/spinner";
import PublicLayout from "@/layouts/public";
import { Organization } from "@/types";

import { OrganizationEvents } from "./components/organization-events";
import { OrganizationOverview } from "./components/organization-overview";

const OrganizationPage = ({ params }: { params: { id: string } }) => {
  const organizationId = Number(params.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization", { id: organizationId }],
    queryFn: () => organizationApi.getById(organizationId as number),
    enabled: !!organizationId
  });

  return (
    <PublicLayout title={data?.name ?? "Organizatie"}>
      <main className="container py-16">
        {isLoading ? (
          <Spinner className="pt-20" />
        ) : isError ? (
          <div className="font-semibold">Organizația nu a fost găsită</div>
        ) : (
          <>
            <OrganizationOverview organization={data as unknown as Organization} />
            <OrganizationEvents organizationId={organizationId} />
          </>
        )}
      </main>
    </PublicLayout>
  );
};

export default OrganizationPage;
