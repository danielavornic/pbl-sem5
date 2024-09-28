/* eslint-disable @next/next/no-img-element */
"use client";

import { isBefore } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaExclamation } from "react-icons/fa6";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
      <main className="container py-8">
        <Link href="/opportunities">
          <Button variant="link-foreground" className="h-auto px-0">
            <ChevronLeft className="mr-2" size={20} />
            Înapoi la oportunități
          </Button>
        </Link>

        <div className="mt-8 grid grid-cols-2 gap-8">
          {/* first quadrant: organization name and event title, description, address and categories */}
          <div className="flex flex-col justify-between">
            <div>
              <Link className="inline-block" href={`/organizations/${organization.id}`}>
                <h2 className="mb-2 text-2xl font-semibold text-muted-foreground transition-colors hover:text-foreground">
                  {organization.name}
                </h2>
              </Link>
              <h1 className="text-3xl font-bold">{title}</h1>
            </div>

            <p className="mt-2 text-justify text-lg">{description}</p>

            <div className="mt-4 flex items-center space-x-2">
              <img src="/location-icon.svg" alt="location-icon" className="inline-block" />
              <p className="inline-block text-lg text-muted-foreground">{data.address}</p>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {data.categories.map((category: any, index: any) => (
                  <Badge key={index} variant="muted">
                    <span className="text-body p-1">{category.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* second quadrant: image */}
          <div className="flex items-center justify-center">
            <Image
              src={image ?? "/images/placeholder.webp"}
              alt={title}
              width={500}
              height={300}
              className="w-fill h-auto object-cover"
            />
          </div>

          {/* third quadrant: action buttons and sessions*/}
          <div className="col-span-2">
            {isPast ? (
              <Button variant="muted" disabled className="mt-8">
                Oportunitatea a expirat
              </Button>
            ) : (
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <Button variant="default" className="w-full">
                    {isLoggedIn ? "Înscrie-te" : "Conectează-te pentru a te înscrie"}
                  </Button>
                  <Button variant="outline" className="mt-8 w-full">
                    <img src="/save-icon.svg" className="mr-2" alt="save-icon" />
                    {isLoggedIn ? "Salvează" : "Conectează-te pentru a salva"}
                  </Button>
                </div>

                {/* fourth quadrant: sessions */}
                <div className="flex justify-center">
                  <div>
                    <h2 className="text-2xl font-bold">Zile disponibile</h2>
                    <p className="text-lg text-muted-foreground">
                      Alege dățile care ți se potrivesc
                    </p>
                    {data.sessions.map((session: any, index: any) => (
                      <Card key={index} className="mt-4 flex w-fit items-center space-x-2 p-4">
                        <Checkbox className="mr-4 rounded-[4px] border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground" />
                        <div className="flex items-center space-x-6">
                          <div className="flex w-[160px] items-center justify-center space-x-2">
                            <img src="/time-icon.svg" alt="time-icon" className="inline-block" />
                            <p className="inline-block text-lg">
                              {session.startTime} - {session.endTime}
                            </p>
                          </div>
                          <div className="flex w-[141px] items-center justify-center space-x-2">
                            <img
                              src="/calendar-icon.svg"
                              alt="calendar-icon"
                              className="inline-block"
                            />
                            <p className="inline-block text-lg">{session.date}</p>
                          </div>

                          <p className="inline-block w-[164px] text-center text-lg text-muted-foreground">
                            {session.spotsLeft} locuri rămase
                            {session.spotsLeft <= 8 ? (
                              <p className="ml-1 inline-block text-xl font-semibold text-secondary">
                                !
                              </p>
                            ) : null}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
