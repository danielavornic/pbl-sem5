"use client";

import dynamic from "next/dynamic";

import PublicLayout from "@/layouts/public";

const DynamicCreateOpportunityForm = dynamic(() => import("./components/form"), { ssr: false });

const CreateOpportunityPage = () => {
  return (
    <PublicLayout title="Creează o oportunitate">
      <main
        className="container flex items-start justify-center gap-[8vw] py-9"
        suppressHydrationWarning
      >
        <div className="grid w-[500px] grid-cols-2 justify-center gap-x-0 gap-y-3">
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px]" />
          <div className="h-[235px] rounded-[30px]" />
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px]" />
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px]" />
        </div>
        <DynamicCreateOpportunityForm />
      </main>
    </PublicLayout>
  );
};

export default CreateOpportunityPage;
