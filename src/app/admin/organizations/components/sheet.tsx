"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CircleCheck, CircleX, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { toast } from "sonner";

import { organizationApi } from "@/api/organizationApi";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ApprovalStatus } from "@/types";

export const OrganizationSheet = () => {
  const [id, setId] = useQueryState("id", parseAsInteger);

  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["organization", { id }],
    queryFn: () => organizationApi.getById(id as number),
    enabled: !!id
  });

  const onSuccess = (status: string) => {
    queryClient.invalidateQueries({ queryKey: ["organization", { id }] });
    queryClient.invalidateQueries({ queryKey: ["organizations"] });
    toast.success(
      `Organizația a fost ${status === "approved" ? "aprobată" : "respinsă"} cu succes.`
    );
  };

  const approveMutation = useMutation({
    mutationFn: () => organizationApi.updateApprovalStatus(id as number, "approved"),
    onSuccess: () => onSuccess("approved"),
    onError: () => toast.error("Eroare la aprobarea organizației")
  });

  const rejectMutation = useMutation({
    mutationFn: () => organizationApi.updateApprovalStatus(id as number, "rejected"),
    onSuccess: () => onSuccess("rejected"),
    onError: () => toast.error("Eroare la respingerea organizației")
  });

  return (
    <>
      <Sheet open={!!id} onOpenChange={(open) => setId(open ? id : null)}>
        <SheetContent className="min-w-[360px] overflow-hidden p-0">
          {isLoading ? (
            <Spinner className="mt-20" />
          ) : isError ? (
            <div className="font-heading font-semibold">Eroare la încărcarea organizației</div>
          ) : isSuccess && data ? (
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
                  <SheetTitle className="text-2xl font-semibold">{data.name}</SheetTitle>
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
                      <DetailItem label="Adresa" value={data.address} />
                      <DetailItem label="Localitate" value={data.region.name} />
                      <DetailItem label="Telefon" value={data.phoneNumber} />
                      <DetailItem label="Website" value={data?.website ?? "-"} />

                      {data?.approvedBy ? (
                        <DetailItem label="Aprobat de" value={data.approvedBy.username} />
                      ) : null}
                      {data.approvalDate && (
                        <DetailItem
                          label="Data aprobării"
                          value={format(new Date(data.approvalDate), "PPP")}
                        />
                      )}
                    </div>

                    {data?.logo && (
                      <div className="space-y-1">
                        <Heading>Logo</Heading>
                        <Image src={data.logo} alt="Logo" width={96} height={96} />
                      </div>
                    )}

                    {data?.categories?.length ? (
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
                    ) : null}
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
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
