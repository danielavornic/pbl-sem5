"use client";

export const OrganizationEvents = ({ organizationId }: { organizationId: number }) => {
  // TODO: Fetch organization events

  return (
    <section className="pt-20">
      <h2 className="text-2xl font-bold">Evenimente organizate</h2>

      <p className="mt-4 text-muted-foreground">
        Acestă organizație nu a adăugat nicio oportuniate de voluntariat până acum.
      </p>
    </section>
  );
};
