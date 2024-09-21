import mockOrganizations from "@/data/organizations.json";
import PublicLayout from "@/layouts/public";
import { Organization } from "@/types";

import { OrganizationEvents } from "./components/organization-events";
import { OrganizationOverview } from "./components/organization-overview";

const OrganizationPage = ({ params }: { params: { id: string } }) => {
  const organizationId = Number(params.id);

  const data = mockOrganizations[1];

  return (
    <PublicLayout title={data.name}>
      <main className="container py-16">
        <OrganizationOverview organization={data as unknown as Organization} />
        <OrganizationEvents organizationId={organizationId} />
      </main>
    </PublicLayout>
  );
};

export default OrganizationPage;
