/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

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
<<<<<<< Updated upstream:src/components/organization-card.tsx
import organizations from "@/data/organizations";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const OrganizationCard = () => {
  const approvedOrganizations = organizations.filter(
    (org: any) => org.approvalStatus === "approved"
  );

=======
import { Label } from "@/components/ui/label";
import { Organization } from "@/types";

const OrganizationCard = ({ org }: { org: Organization }) => {
>>>>>>> Stashed changes:src/app/organizations/components/organization-card.tsx
  return (
    <>
      {approvedOrganizations.length > 0 ? (
        approvedOrganizations.map((org: any) => (
          <Card key={org.id} className="flex h-full flex-col">
            <CardHeader className="flex-grow-0 space-y-2">
              <Badge className="w-fit border-none bg-secondary" variant="outline">
                <Label className="text-body p-1 text-gray-100">{org.region.name}</Label>
              </Badge>
              <img src={org.logo} alt={org.name} className="h-[150px] w-[150px] rounded-full" />
            </CardHeader>
            <CardContent className="flex flex-grow flex-col justify-between">
              <div className="flex flex-grow flex-col justify-center space-y-4">
                <CardTitle>{org.name}</CardTitle>
                <CardDescription className="line-clamp-3 break-words">
                  {org.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {org.categories.map((category: any, index: any) => (
                    <Badge key={index} variant="muted">
                      <span className="text-body p-1">{category.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              <CardFooter className="p-0 pt-4">
                <Button asChild className="w-full">
                  <Link href={`/organizations/${org.id}`}>Detalii</Link>
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Nu există organizații aprobate</p>
      )}
    </>
  );
};

export default OrganizationCard;
