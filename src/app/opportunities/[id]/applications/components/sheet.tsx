"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, CircleCheck, CircleX, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";

import OppStatusBadge from "@/app/opportunities/components/opp-status-badge";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import mockData from "@/data/applications.json";
import { Application } from "@/types/application";

import FileItem from "./file-item";

export const ApplicationSheet = () => {
  const [id, setId] = useQueryState("id", parseAsInteger);
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data: Application | undefined = mockData.find((opp) => opp.id === id) as Application;

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

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["application", { id }],
  //   queryFn: () => applicationApi.getById(id as number),
  //   enabled: !!id
  // });

  // const approveMutation = useMutation({
  //   mutationFn: () => applicationApi.updateApprovalStatus(id as number, "approved"),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["application", { id }] });
  //     queryClient.invalidateQueries({ queryKey: ["applications"] });
  //     toast.success("Aplicația a fost aprobată cu succes.");
  //   },
  //   onError: () => toast.error("Eroare la aprobarea aplicației")
  // });

  // const rejectMutation = useMutation({
  //   mutationFn: () => applicationApi.updateApprovalStatus(id as number, "rejected"),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["application", { id }] });
  //     queryClient.invalidateQueries({ queryKey: ["applications"] });
  //     toast.success("Aplicația a fost respinsă cu succes.");
  //   },
  //   onError: () => toast.error("Eroare la respingerea aplicației")
  // });

  return (
    <Sheet open={!!id} onOpenChange={(open) => setId(open ? id : null)}>
      <SheetContent className="min-w-[360px] overflow-hidden p-0">
        {isLoading ? (
          <Spinner className="mt-20" />
        ) : error ? (
          <div className="font-heading font-semibold">Eroare la încărcarea aplicației</div>
        ) : data ? (
          <>
            <div className="flex min-h-[54px] items-center justify-end space-x-3 border-b py-3 pl-6 pr-16">
              {data.approvalStatus === "pending" && (
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
              )}
            </div>

            <ScrollArea className="h-[calc(100vh-4rem)]">
              <SheetHeader className="space-y-0 p-8 pt-7">
                <div className="flex items-center gap-2">
                  <SheetTitle className="text-2xl font-semibold">
                    <Link
                      href={`/users/${data.user.id}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {data.user.firstName} {data.user.lastName}
                    </Link>
                  </SheetTitle>
                  <OppStatusBadge status={data.approvalStatus} />
                </div>
              </SheetHeader>

              <div className="px-3 pb-6 md:px-8">
                <div className="flex space-x-4 text-xs font-medium opacity-80">
                  <p>Aplicat la {format(new Date(data.createdAt), "HH:mm, PPP")}</p>
                  {data.approvalDate && (
                    <p>Aprobat la {format(new Date(data.approvalDate), "HH:mm, PPP")}</p>
                  )}
                </div>
                {/* <div className="flex space-x-4 text-xs font-medium opacity-80">
                  <p>Aplicat la {format(new Date(data.createdAt), "HH:mm, PPP")}</p>
                  {data.approvalDate && (
                    <p>
                      {data.approvalStatus} la {format(new Date(data.approvalDate), "HH:mm, PPP")}
                    </p>
                  )}
                </div> */}

                {data.text && (
                  <div className="mt-6">
                    <Heading>Mesaj</Heading>
                    <p className="mt-2 whitespace-pre-line text-sm">{data.text}</p>
                  </div>
                )}

                <div className="mt-8 space-y-8">
                  {data.sessions.length > 0 && (
                    <div className="space-y-2">
                      <Heading>Sesiuni selectate</Heading>
                      <div className="grid grid-cols-2 gap-2">
                        {data.sessions.map((session, index) => (
                          <Card key={index} className="shadow-none">
                            <CardHeader className="flex flex-row items-center gap-6 space-y-0 p-3 text-sm">
                              <div className="flex items-center gap-1.5">
                                <Clock className="text-muted-foreground" size={16} />
                                {format(new Date(session.startTime), "HH:mm")} -{" "}
                                {format(new Date(session.endTime), "HH:mm")}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="text-muted-foreground" size={16} />
                                {format(new Date(session.date), "PPP")}
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.files.length > 0 && (
                    <div className="space-y-2">
                      <Heading>Documente atașate</Heading>
                      <div className="grid grid-cols-2 gap-2">
                        {data.files.map((file, index) => (
                          <FileItem key={index} filename={file} url={file} />
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
