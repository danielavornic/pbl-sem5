/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import opportunities from "@/data/opportunities.json";
import { Opportunity } from "@/types";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";

const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => {
  return (
    <Card key={opportunity.id} className="flex h-full flex-col">
      <CardHeader className="flex-grow-0 space-y-4">
        <Badge className="w-fit border-none bg-secondary" variant="outline">
          <Label className="text-body p-1 text-gray-100">{opportunity.region?.name}</Label>
        </Badge>
        <img
          src={opportunity.image ?? "/images/placeholder.webp"}
          alt={opportunity.title}
          className="w-fill h-[260px] object-cover"
        />
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between">
        <div className="flex flex-grow flex-col justify-center space-y-4">
          <CardTitle>{opportunity.title}</CardTitle>
          <CardDescription className="line-clamp-3 break-words">
            {opportunity.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {opportunity.categories.map((category: any, index: any) => (
              <Badge key={index} variant="muted">
                <span className="text-body p-1">{category.name}</span>
              </Badge>
            ))}
          </div>
          <div className="space-y-3 pt-5">
            <div className="flex items-center gap-2">
              <img src="/calendar-icon.svg" alt="time-icon" className="inline-block" />
              <p className="text-sm text-muted-foreground">
                {format(new Date(opportunity.sessions[0].date), "hh:mm, dd MMM yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/location-icon.svg" alt="time-icon" className="inline-block" />
              <p className="text-sm text-muted-foreground">
                {opportunity.address}, {opportunity.region.name}
              </p>
            </div>
          </div>
        </div>
        <CardFooter className="p-0 pt-4">
          <Button asChild size="sm" variant="outline" className="ml-auto">
            <Link href={`/opportunities/${opportunity.id}`}>Detalii</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
