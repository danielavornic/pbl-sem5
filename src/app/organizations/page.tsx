"use client";

import OrganizationCard from "@/components/organization-card";
import PublicLayout from "@/layouts/public";

import FilteredSearch from "./FilteredSearch";

const OrganizationsPage = () => {
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
