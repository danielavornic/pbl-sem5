"use client";

import { format } from "date-fns";
import { Calendar, CircleCheck, CircleX, Clock, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// Import opportunities data from JSON file
import opportunitiesData from "@/data/opportunities.json";
import { ApprovalStatus, Opportunity } from "@/types/opportunity";

export const OpportunitySheet = () => {
  const [id, setId] = useQueryState("id", parseAsInteger);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data: Opportunity | undefined = opportunitiesData.find(
    (opp) => opp.id === id
  ) as Opportunity;

  const approveMutation = {
    mutate: () => {
      toast.success("Oportunitatea a fost aprobată cu succes.");
    },
    isPending: false
  };

  const rejectMutation = {
    mutate: () => {
      toast.success("Oportunitatea a fost respinsă cu succes.");
    },
    isPending: false
  };

  // Commented out React Query hooks for future implementation
  /*
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["opportunity", { id }],
    queryFn: () => opportunityApi.getById(id as number),
    enabled: !!id
  });

  const approveMutation = useMutation({
    mutationFn: () => opportunityApi.updateApprovalStatus(id as number, "approved"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunity", { id }] });
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      toast.success("Oportunitatea a fost aprobată cu succes.");
    },
    onError: () => toast.error("Eroare la aprobarea oportunității")
  });

  const rejectMutation = useMutation({
    mutationFn: () => opportunityApi.updateApprovalStatus(id as number, "rejected"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunity", { id }] });
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      toast.success("Oportunitatea a fost respinsă cu succes.");
    },
    onError: () => toast.error("Eroare la respingerea oportunității")
  });
  */

  return (
    <Sheet open={!!id} onOpenChange={(open) => setId(open ? id : null)}>
      <SheetContent className="min-w-[360px] overflow-hidden p-0">
        {isLoading ? (
          <Spinner className="mt-20" />
        ) : error ? (
          <div className="font-heading font-semibold">Eroare la încărcarea oportunității</div>
        ) : data ? (
          <>
            <div className="flex items-center justify-end space-x-3 border-b py-3 pl-6 pr-16">
              {data.approvalStatus === "pending" ? (
                <>
                  <Button
                    size="sm"
                    variant="success"
                    className="text-xs"
                    onClick={() => approveMutation.mutate()}
                    loading={approveMutation.isPending}
                  >
                    <CircleCheck className="mr-2 h-4 w-4" />
                    Aprobă
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="!mr-2 text-xs"
                    onClick={() => rejectMutation.mutate()}
                    loading={rejectMutation.isPending}
                  >
                    <CircleX className="mr-2 h-4 w-4" />
                    Respinge
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="muted" className="text-xs">
                    <SquarePen className="mr-2 h-4 w-4" />
                    Editează
                  </Button>
                  <Button size="sm" variant="destructive" className="!mr-2 text-xs">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Șterge
                  </Button>
                </>
              )}
            </div>

            <ScrollArea className="h-[calc(100vh-4rem)]">
              <SheetHeader className="flex flex-row gap-2 space-y-0 p-8 pt-7">
                <SheetTitle className="text-2xl font-semibold">{data.title}</SheetTitle>
                <Badge
                  variant={
                    data.approvalStatus === "approved"
                      ? "success"
                      : data.approvalStatus === "rejected"
                        ? "destructive"
                        : "warning"
                  }
                >
                  {ApprovalStatus[data.approvalStatus as keyof typeof ApprovalStatus]}
                </Badge>
              </SheetHeader>
              <div className="px-3 pb-6 md:px-8">
                <div className="flex space-x-4 text-xs font-medium opacity-80">
                  <p>Creat la {format(new Date(data.createdAt), "HH:mm, PPP")}</p>
                  <p>Actualizat la {format(new Date(data.updatedAt), "HH:mm, PPP")}</p>
                </div>

                <p className="text-body-md mt-6 whitespace-pre-line">{data.description}</p>

                <div className="mt-8 space-y-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                      label="Creat de"
                      value={data.createdBy.firstName + " " + data.createdBy.lastName}
                    />
                    <DetailItem label="Organizație" value={data.organization.name} />
                    <DetailItem label="Adresa" value={data.address} />
                    <DetailItem
                      label="Prioritate"
                      value={data.isHighPriority ? "Înaltă" : "Normală"}
                    />
                    {data?.approvedBy && (
                      <DetailItem label="Aprobat de" value={data.approvedBy.username} />
                    )}
                    {data.approvalDate && (
                      <DetailItem
                        label="Data aprobării"
                        value={format(new Date(data.approvalDate), "PPP")}
                      />
                    )}
                  </div>

                  {data?.image && (
                    <div className="space-y-1">
                      <Heading>Imagine</Heading>
                      <Image src={data.image} alt="Imagine oportunitate" width={300} height={150} />
                    </div>
                  )}

                  {data?.categories?.length > 0 && (
                    <div className="space-y-1">
                      <Heading>Categorii</Heading>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {data.categories.map((category) => (
                          <Badge key={category.id} variant="muted">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {data?.skills?.length > 0 && (
                    <div className="space-y-1">
                      <Heading>Abilități necesare</Heading>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {data.skills.map((skill) => (
                          <Badge key={skill.id} variant="outline">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {data?.sessions?.length > 0 && (
                    <div className="space-y-1">
                      <Heading>Sesiuni</Heading>
                      <div className="space-y-2 pt-1">
                        {data.sessions.map((session, index) => (
                          <Card key={index} className="shadow-none">
                            <CardHeader className="flex flex-row justify-between gap-2 space-y-0 text-sm">
                              <div className="flex items-center gap-8">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="text-muted-foreground" size={16} />
                                  {session.startTime.slice(0, 5)} - {session.endTime.slice(0, 5)}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="text-muted-foreground" size={16} />
                                  {format(new Date(session.date), "PPP")}
                                </div>
                              </div>
                              <div className="font-semibold text-primary">
                                {session.spotsLeft} locuri
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold uppercase text-foreground/80">{children}</h3>
);

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <div className="space-y-1">
    <Heading>{label}</Heading>
    <div className="pt-1 text-sm font-bold">{value}</div>
  </div>
);
