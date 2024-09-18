"use client";

import dynamic from "next/dynamic";

import PublicLayout from "@/layouts/public";

const DynamicCreateOpportunityForm = dynamic(() => import("./components/form"), {
  ssr: false
});

const CreateOpportunityPage = () => {
  return (
    <PublicLayout title="Creează o oportunitate">
      <main
        className="container mx-auto flex w-full items-start justify-center gap-[8vw] py-9"
        suppressHydrationWarning
      >
        <div className="grid max-w-[470px] grid-cols-2 justify-center gap-y-3">
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px] bg-muted" />
          <div className="h-[240px] w-[240px] rounded-[30px]" />
        </div>
        <DynamicCreateOpportunityForm />
      </main>
    </PublicLayout>
  );
};

export default CreateOpportunityPage;
