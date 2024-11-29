"use client";

import { useQuery } from "@tanstack/react-query";

// import { applicationApi } from "@/api/applicationApi";
import { Spinner } from "@/components/spinner";
import applications from "@/data/applications.json";
import PublicLayout from "@/layouts/public";

import ApplicationCard from "../components/application-card";
import { ApplicationSheet } from "../components/sheet";
import { AccountSidebar } from "../components/sidebar";

const ApplicationsPage = () => {
  // const opportunityQuery = useQuery({
  //   queryKey: ["opportunities"],
  //   queryFn: opportunityApi.getAll,
  //   select: (data) => {
  //     return Array.isArray(data) ? data : [];
  //   }
  // });

  const applicationQuery = {
    isLoading: false,
    isSuccess: true,
    data: applications
  };

  return (
    <PublicLayout title="Aplicările mele">
      <main className="container h-full py-10">
        <section>
          <h1 className="text-3xl font-semibold">Contul meu</h1>
          <div className="mt-8 flex">
            <AccountSidebar />
            {applicationQuery.isLoading ? (
              <Spinner className="mt-32" />
            ) : applicationQuery.isSuccess ? (
              <div className="grid w-fit flex-1 grid-cols-2 gap-6">
                {applicationQuery.data.map((application: any) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <div className="font-heading font-semibold">
                Nu ai aplicat încă la nicio oportunitate.
              </div>
            )}
          </div>
          <ApplicationSheet />
        </section>
      </main>
    </PublicLayout>
  );
};

export default ApplicationsPage;
