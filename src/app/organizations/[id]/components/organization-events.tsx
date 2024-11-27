"use client";
import { useQuery } from "@tanstack/react-query";

import { organizationApi } from "@/api/organizationApi";
import OpportunityCard from "@/app/opportunities/components/opportunity-card";
import { Spinner } from "@/components/spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export const OrganizationEvents = ({ organizationId }: { organizationId: number }) => {
  const opportunityQuery = useQuery({
    queryKey: ["organizations", organizationId, "opportunities"],
    queryFn: () => organizationApi.getOpportunities(organizationId),
    select: (data) => {
      return Array.isArray(data) ? data : [];
    }
  });

  return (
    <section className="pt-20">
      <h2 className="text-2xl font-bold">Evenimente organizate</h2>
      {opportunityQuery.isLoading ? (
        <Spinner className="mt-32" />
      ) : opportunityQuery.isSuccess && opportunityQuery.data.length > 0 ? (
        <div className="mt-6">
          <Carousel className="w-full">
            <CarouselContent>
              {opportunityQuery.data.map((opportunity: any) => (
                <CarouselItem key={opportunity.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <OpportunityCard opportunity={opportunity} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <div className="font-heading font-semibold">
          Nu s-au găsit oportunități care să corespundă criteriilor de căutare.
        </div>
      )}
      <p className="mt-4 text-muted-foreground">
        Acestă organizație nu a adăugat nicio oportuniate de voluntariat până acum.
      </p>
    </section>
  );
};
