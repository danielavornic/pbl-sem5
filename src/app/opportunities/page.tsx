"use client";

import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

import { opportunityApi } from "@/api/opportunityApi";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/components/ui/multiple-selector";
import defaultOpportunities from "@/data/opportunities.json";
import PublicLayout from "@/layouts/public";

import FilteredSearch from "./components/filteredSearch";
import OpportunityCard from "./components/opportunity-card";

const OpportunitiesPage = () => {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: ""
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const opportunityQuery = useQuery({
    queryKey: ["opportunities"],
    queryFn: opportunityApi.getAll,
    select: (data) => {
      return Array.isArray(data) ? data : [];
    }
  });
  console.log(opportunityQuery.data);

  // const filteredOpportunities = useMemo(() => {
  //   if (!opportunityQuery.data || !Array.isArray(opportunityQuery.data)) {
  //     return [];
  //   }

  //   return opportunityQuery.data.filter((opportunity: any) => {
  //     return opportunity.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  //   });
  // }, [opportunityQuery.data, debouncedSearchTerm]);

  return (
    <PublicLayout title="Oportunități">
      <main className="container">
        <div className="mb-10 mt-10">
          <h1 className="text-3xl font-bold">Oportunități</h1>
        </div>
        {opportunityQuery.isLoading ? (
          <Spinner className="mt-32" />
        ) : opportunityQuery.isSuccess ? (
          <div className="grid grid-cols-3 gap-4">
            <FilteredSearch />
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {opportunityQuery.data.map((opportunity: any) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          </div>
        ) : (
          <div className="font-heading font-semibold">
            Nu s-au găsit oportunități care să corespundă criteriilor de căutare.
          </div>
        )}
        {/* <div className="grid grid-cols-3 gap-4">
          <FilteredSearch />
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {defaultOpportunities.map((opportunity: any) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div> */}
      </main>
    </PublicLayout>
  );
};

export default OpportunitiesPage;
