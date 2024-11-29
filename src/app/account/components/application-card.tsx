/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { Calendar, Clock, EllipsisIcon, EyeIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

import OppStatusBadge from "@/app/opportunities/components/opp-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Application } from "@/types";

const ApplicationCard = ({ application }: { application: Application }) => {
  return (
    <Card key={application.id} className="flex h-full flex-col">
      <CardHeader className="flex-grow-0 space-y-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <OppStatusBadge status={application.approvalStatus} />
          </div>

          <div className="-mr-2 -mt-2 flex flex-1 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <EllipsisIcon className="h-6 w-6 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <EyeIcon className="mr-2" size={16} />
                  Vezi
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SquarePenIcon className="mr-2" size={16} />
                  Editează
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2Icon className="mr-2" size={16} />
                  Șterge
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <img
          src={application.opportunity.image ?? "/images/placeholder.webp"}
          alt={application.opportunity.title}
          className="w-fill h-[260px] object-cover"
        />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between">
        <div className="flex flex-grow flex-col justify-center space-y-4">
          <CardTitle>{application.opportunity.title}</CardTitle>

          <CardDescription className="line-clamp-3 break-words">
            {application.opportunity.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {application.opportunity.categories.map((category: any, index: number) => (
              <Badge key={index}>
                <span className="text-body p-1">{category.name}</span>
              </Badge>
            ))}
          </div>
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-2">
              <img src="/location-icon.svg" alt="time-icon" className="inline-block" />
              <p className="text-sm text-muted-foreground">
                {application.opportunity.address}, {application.opportunity.region.name}
              </p>
            </div>
          </div>

          {application.opportunity?.sessions?.length > 0 && (
            <div className="space-y-3 pt-4">
              {application.opportunity.sessions.map((session, index) => (
                <Card key={index} className="flex-1 shadow-none">
                  <CardHeader className="flex flex-row justify-between space-y-0 p-3 text-sm">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="text-muted-foreground" size={16} />
                        {format(new Date(session.startTime), "HH:mm")} -{" "}
                        {format(new Date(session.endTime), "HH:mm")}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="text-muted-foreground" size={16} />
                        {format(new Date(session.date), "PPP")}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
        <CardFooter className="p-0 pt-4">
          <Button asChild size="sm" variant="outline" className="ml-auto">
            <Link href={`/applications/${application.id}`}>Vezi aplicarea</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
