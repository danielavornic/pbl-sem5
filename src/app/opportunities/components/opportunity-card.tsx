/* eslint-disable @next/next/no-img-element */
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
          className="w-fill h-[150px] object-cover"
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
        </div>
        <CardFooter className="p-0 pt-4">
          <Button asChild size="sm" className="ml-auto">
            <Link href={`/opportunities/${opportunity.id}`}>Detalii</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
