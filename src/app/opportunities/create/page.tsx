"use client";

import PublicLayout from "@/layouts/public";

import CreateOpportunityForm from "./components/form";

const CreateOpportunityPage = () => {
  return (
    <PublicLayout title="Creează o oportunitate">
      <main
        className="container flex w-full items-start justify-center gap-[8vw] py-9"
        suppressHydrationWarning
      >
        <div className="grid max-w-[420px] grid-cols-2 justify-center gap-y-3">
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
        </div>
        <CreateOpportunityForm />
      </main>
    </PublicLayout>
  );
};

export default CreateOpportunityPage;
