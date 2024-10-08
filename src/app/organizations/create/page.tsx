"use client";

import PublicLayout from "@/layouts/public";

import CreateOrganizationForm from "./components/form";

const CreateOrganizationPage = () => {
  return (
    <PublicLayout title="Creează o organizație">
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
        <CreateOrganizationForm />
      </main>
    </PublicLayout>
  );
};

export default CreateOrganizationPage;
