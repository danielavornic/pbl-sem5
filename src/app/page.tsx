"use client";

import Image from "next/image";
import Link from "next/link";
import { parseAsBoolean, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/public";

import SetupAccountDialog from "./auth/login/components/setup-dialog";

export default function Home() {
  const [setup, setSetup] = useQueryState("setup", parseAsBoolean);

  return (
    <PublicLayout title="Home">
      <main className="container my-10 flex items-center justify-center">
        <div className="flex items-center justify-between space-x-12">        
          <div className="w-[50%] relative">
            <h1 className="mb-6 max-w-[600px] text-5xl font-semibold">
              Bine ai venit în lumea voluntarilor!
            </h1>
            <Image
              alt="heart"
              src="/heart-icon.svg"
              className="inline-block absolute right-[-20px] top-[40px]"
              height={57}
              width={48}
            />
            <div className="max-w-[570px]">
              <p className="max-w-[520px] text-lg text-gray-600">
                Conectăm oamenii care vor să se implice cu organizațiile care creează oportunități
                de voluntariat.
              </p>
              <div className="mt-12 flex justify-end">
                <Button variant="default">
                  <Link href="/opportunities">Vezi oportunitățile</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-auto relative m-0">
            <div className="absolute top-[-50px] left-[-70px] w-auto h-auto">
              <Image
                src="/doodles.svg"
                alt="Doodles"
                width={170}
                height={200}
                className="animate-doodle-bounce"
              />
            </div>  
            <Image
              width={340}
              height={511}
              src="/home-page.jpg"
              alt="Hands joining together"
              className="rounded-lg border-[6px] border-[#DBC6FF]"
            />
            <div className="absolute bottom-[-60px] right-[-80px] w-auto h-auto animate-sun-rotate">
              <Image
                src="/sun.svg"
                alt="Sun"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </main>

      <SetupAccountDialog open={!!setup} onOpenChange={setSetup} />
    </PublicLayout>
  );
}
