"use client";

import { isBefore } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import opportunities from "@/data/opportunities.json";
import PublicLayout from "@/layouts/public";
import useUserStore from "@/lib/user-store";
import { Opportunity } from "@/types";

const today = new Date();

const OpportunityPage = ({ params }: { params: { id: string } }) => {
  const opportunityId = Number(params.id);

  const data = opportunities.find((opp) => opp.id === opportunityId) as Opportunity;
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["opportunity", { id: opportunityId }],
  //   queryFn: () => opportunityApi.getById(opportunityId as number),
  //   enabled: !!opportunityId
  // });

  const { isLoggedIn } = useUserStore();

  const isPast = isBefore(new Date(data?.sessions[0].date), today);

  const { organization, title, sessions, description, image } = data;
  return (
    <PublicLayout title={data?.title ?? "Oportunitate"}>
      <main className="container py-12">
        <Link href="/opportunities">
          <Button variant="link-foreground" className="h-auto px-0">
            <ChevronLeft className="mr-2" size={20} />
            Înapoi la oportunități
          </Button>
        </Link>

        <div className="mt-8 grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Link href={`/organizations/${organization.id}`}>
              <h2 className="mb-2 text-2xl font-semibold text-muted-foreground transition-colors hover:text-foreground">
                {organization.name}
              </h2>
            </Link>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="mt-8">
              <p className="text-lg">{description}</p>
            </div>

            {isPast ? (
              <Button variant="muted" disabled className="mt-8">
                Oportunitatea a expirat
              </Button>
            ) : (
              <>
                {/* form with sessions */}
                <Button variant="default" className="mt-8">
                  {isLoggedIn ? "Înscrie-te" : "Conectează-te pentru a te înscrie"}
                </Button>
              </>
            )}
          </div>

          <div>
            {/* one card w info, somoe other related info, then another aboutt organization */}
          </div>
        </div>

        {/* {isLoading ? (
          <Spinner className="pt-20" />
        ) : isError ? (
          <div className="font-semibold">Oportunitatea nu a fost găsită</div>
        ) : (
          <>
          info
          </>
        )} */}
      </main>
    </PublicLayout>
  );
};

export default OpportunityPage;
