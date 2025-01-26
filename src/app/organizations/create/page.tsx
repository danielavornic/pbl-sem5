"use client";

import Image from "next/image";
import PublicLayout from "@/layouts/public";
import CreateOrganizationForm from "./components/form";

const CreateOrganizationPage = () => {
  return (
    <PublicLayout title="Creează o organizație">
      <main className="container flex items-start justify-center gap-[12vw] py-9" suppressHydrationWarning>
        <div className="grid w-[440px] grid-cols-2 justify-center gap-x-2 gap-y-2">
          <div className="h-[214px] overflow-hidden">
            <Image src="/square1.svg" alt="Square 1" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square2.svg" alt="Square 2" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square3.svg" alt="Square 3" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square4.svg" alt="Square 4" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square5.svg" alt="Square 5" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square6.svg" alt="Square 6" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square7.svg" alt="Square 7" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square8.svg" alt="Square 8" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/sun.svg" alt="Square 9" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square10.svg" alt="Square 10" width={214} height={214} />
          </div>
        </div>
        <CreateOrganizationForm />
      </main>
    </PublicLayout>
  );
};

export default CreateOrganizationPage;