"use client";

<<<<<<< Updated upstream
import OrganizationCard from "@/components/organization-card";
import PublicLayout from "@/layouts/public";

import FilteredSearch from "./FilteredSearch";

const OrganizationsPage = () => {
=======
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

import { organizationApi } from "@/api/organizationApi";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/components/ui/multiple-selector";
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
    if (!organizationQuery.data || !Array.isArray(organizationQuery.data)) {
      return [];
    }

    return organizationQuery.data.filter((org: any) => {
      return org.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });
  }, [organizationQuery.data, debouncedSearchTerm]);

>>>>>>> Stashed changes
  return (
    <PublicLayout title="Organizații">
      <main className="container">
        <div className="my-10">
          <FilteredSearch />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <OrganizationCard />
        </div>
      </main>
    </PublicLayout>
  );
};

export default OrganizationsPage;
