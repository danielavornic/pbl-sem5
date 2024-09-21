import { Globe, MapPin, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Organization } from "@/types";

export const OrganizationOverview = ({ organization }: { organization: Organization }) => {
  const { name, createdBy, description, address, region, phoneNumber, website } = organization;

  return (
    <Card className="shadow-none">
      <CardContent className="flex flex-row items-start gap-8 p-10">
        {organization?.logo && (
          <Image
            src={organization.logo}
            alt={name}
            className="h-auto w-32 object-contain"
            width={0}
            height={0}
            priority
            sizes="100vw"
          />
        )}
        <div>
          <CardHeader className="p-0">
            <CardTitle className="text-4xl">{name}</CardTitle>
            <CardDescription className="pt-1 text-sm text-foreground">
              <Button variant="link-foreground" className="h-auto p-0" asChild>
                <Link href={`/users/${createdBy.id}`}>
                  Administrat de: {createdBy.firstName + " " + createdBy.lastName}
                </Link>
              </Button>
            </CardDescription>

            {organization.categories && (
              <div className="flex flex-wrap gap-2 pt-4">
                {organization.categories.map((tag) => (
                  <Link key={tag.id} href={`/organizations?category=${tag.id}`}>
                    <Badge variant="muted">{tag.name}</Badge>
                  </Link>
                ))}
              </div>
            )}

            <CardDescription className="pt-3 text-lg">{description}</CardDescription>
          </CardHeader>

          <div className="mt-8 flex flex-wrap items-center gap-10">
            <Detail icon={<MapPin size={20} />} value={address} />
            <Detail icon={<MapPinned size={20} />} value={region.name} />
            <Detail icon={<Phone size={20} />} value={phoneNumber} href={`tel:${phoneNumber}`} />
            <Detail icon={<Globe size={20} />} value={website} href={website} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Detail = ({
  icon,
  value,
  href
}: {
  icon: React.ReactNode;
  value?: string;
  href?: string;
}) => {
  if (!value || value === "") {
    return null;
  }

  const renderInner = () => {
    return (
      <>
        <div className="text-secondary">{icon}</div>
        <span className="font-heading font-medium text-muted-foreground">{value}</span>
      </>
    );
  };

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-2 underline-offset-4 transition-colors duration-200 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {renderInner()}
      </a>
    );
  }

  return <div className="flex items-center gap-2">{renderInner()}</div>;
};
