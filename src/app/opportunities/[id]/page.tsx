/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import { format, isBefore } from "date-fns";
import { Bookmark, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { opportunityApi } from "@/api/opportunityApi";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import PublicLayout from "@/layouts/public";
import useUserStore from "@/lib/user-store";
import { cn } from "@/lib/utils";
import { NamedEntity, SessionExtended } from "@/types";

const today = new Date();

const OpportunityPage = ({ params }: { params: { id: string } }) => {
  const opportunityId = Number(params.id);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["opportunity", { id: opportunityId }],
    queryFn: () => opportunityApi.getById(opportunityId as number),
    enabled: !!opportunityId
  });

  const { isLoggedIn } = useUserStore();

  const isPast = useMemo(() => {
    if (!data) return false;

    let isPast = true;

    data.sessions.forEach((session: any) => {
      const sessionDate = new Date(session.date);
      if (isBefore(sessionDate, today)) {
        isPast = false;
      }
    });

    return isPast;
  }, [data]);

  const { organization, title, sessions, description, image } = data ?? {
    organization: { id: 0, name: "" },
    title: "",
    sessions: [],
    description: "",
    image: ""
  };
  return (
    <PublicLayout title={data?.title ?? "Oportunitate"}>
      <main className="container py-8">
        {isLoading ? (
          <Spinner className="pt-20" />
        ) : isError ? (
          <div className="font-semibold">Oportunitatea nu a fost găsită</div>
        ) : data ? (
          <>
            <Link href="/opportunities">
              <Button variant="link-foreground" className="h-auto px-0">
                <ChevronLeft className="mr-2" size={20} />
                Înapoi la oportunități
              </Button>
            </Link>

            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <div className="flex flex-col justify-between">
                  <div>
                    <Link className="inline-block" href={`/organizations/${organization.id}`}>
                      <h2 className="mb-2 text-2xl font-semibold text-muted-foreground transition-colors hover:text-foreground">
                        {organization.name}
                      </h2>
                    </Link>
                    <h1 className="text-3xl font-bold">{title}</h1>
                  </div>

                  <p className="mt-6 whitespace-pre-line text-justify text-lg">{description}</p>

                  <div className="mt-6 flex items-center space-x-2">
                    <img src="/location-icon.svg" alt="location-icon" className="inline-block" />
                    <p className="inline-block text-lg text-muted-foreground">
                      {data.address}, {data.region.name}
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {data.categories.map((category: NamedEntity, index: number) => (
                        <Badge key={index} variant="muted">
                          <span className="text-body p-1">{category.name}</span>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill: NamedEntity, index: number) => (
                        <Badge key={index} variant="outline">
                          <span className="text-body p-1">{skill.name}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  {isPast ? (
                    <Button variant="muted" disabled className="mt-8">
                      Oportunitatea a expirat
                    </Button>
                  ) : (
                    <div className="mt-10">
                      <h2 className="text-2xl font-bold">Zile disponibile</h2>
                      <p className="text-lg text-muted-foreground">
                        Alege dățile care ți se potrivesc
                      </p>
                      {data.sessions.map((session: SessionExtended, index: number) => (
                        <Card
                          key={index}
                          className={cn("mt-2 flex w-fit items-center space-x-2 p-4", {
                            "cursor-not-allowed": session.spotsLeft === 0
                          })}
                          title={session.spotsLeft === 0 ? "Toate locurile sunt ocupate" : ""}
                        >
                          <Checkbox
                            disabled={session.spotsLeft === 0}
                            className="mr-4 rounded-[4px] border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
                          />
                          <div className="flex items-center space-x-6">
                            <div className="flex w-[220px] items-center justify-center space-x-2">
                              <img src="/time-icon.svg" alt="time-icon" className="inline-block" />
                              <p className="inline-block text-lg opacity-80">
                                {format(new Date(session.startTime), "hh:mm a")} -{" "}
                                {format(new Date(session.endTime), "hh:mm a")}
                              </p>
                            </div>
                            <div className="flex w-[141px] items-center justify-center space-x-2">
                              <img
                                src="/calendar-icon.svg"
                                alt="calendar-icon"
                                className="inline-block"
                              />
                              <p className="inline-block text-lg opacity-80">
                                {format(new Date(session.date), "dd MMM yyyy")}
                              </p>
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

                      <div className="mt-6 flex w-fit flex-col gap-2">
                        <Button variant="default">
                          {isLoggedIn ? "Înscrie-te" : "Conectează-te pentru a te înscrie"}
                        </Button>
                        <Button variant="outline">
                          <Bookmark className="mr-2" size={20} />
                          {isLoggedIn ? "Salvează" : "Conectează-te pentru a salva"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-end">
                <Card className="max-w-[520px]">
                  <CardHeader className="flex-grow-0 space-y-4">
                    <Image
                      src={image ?? "/images/placeholder.webp"}
                      alt={title ?? "Oportunitate"}
                      width={500}
                      height={300}
                      className="w-fill h-auto object-contain"
                    />
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <CardTitle className="text-xl opacity-80">Despre {organization.name}</CardTitle>
                    <CardDescription className="mt-4 text-base">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas natus hic ut.
                      Assumenda, dignissimos iusto quis minus dicta est explicabo et aut, officia
                      ratione unde dolorum hic! Excepturi, iste corporis.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : isError ? (
          <div className="font-semibold">Oportunitatea nu a fost găsită</div>
        ) : null}
      </main>
    </PublicLayout>
  );
};

export default OpportunityPage;
