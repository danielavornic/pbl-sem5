"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

import { organizationApi } from "@/api/organizationApi";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/components/ui/multiple-selector";
import defaultOrganizations from "@/data/organizations.json";
import PublicLayout from "@/layouts/public";

import OrganizationCard from "./components/organization-card";

const OrganizationsPage = () => {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: ""
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const organizationQuery = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationApi.getAll,
    select: (data) => {
      return Array.isArray(data) ? data : [];
    }
  });

  const filteredOrganizations = useMemo(() => {
    if (!organizationQuery.data) {
      return [];
    }

    return organizationQuery.data.filter((org: any) => {
      return org.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });
  }, [organizationQuery.data, debouncedSearchTerm]);

  return (
    <PublicLayout title="Organizații">
      <main className="container">
        <div className="mb-10 mt-10 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold">Organizații</h1>
          <div>
            <Input
              type="text"
              placeholder="Caută organizații"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {organizationQuery.isLoading ? (
          <Spinner className="mt-32" />
        ) : organizationQuery.isSuccess && filteredOrganizations.length > 0 ? (
          <div className="grid grid-cols-3 gap-6 2xl:grid-cols-4">
            {filteredOrganizations.map((org: any) => (
              <OrganizationCard key={org.id} org={org} />
            ))}
          </div>
        ) : (
          <div className="font-heading font-semibold">
            Nu s-au găsit organizații care să corespundă criteriilor de căutare.
          </div>
        )}
        {/* <div className="grid grid-cols-3 gap-6 2xl:grid-cols-4">
          {defaultOrganizations.map((org: any) => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div> */}
      </main>
    </PublicLayout>
  );
};

export default OrganizationsPage;
