"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import PublicLayout from "@/layouts/public";

import SetupAccountDialog from "./auth/login/components/setup-dialog";

export default function Home() {
  const [setup, setSetup] = useQueryState("setup", parseAsBoolean);

  return (
    <PublicLayout title="Home">
      <main className="container my-10">hello</main>

      <SetupAccountDialog open={!!setup} onOpenChange={setSetup} />
    </PublicLayout>
  );
}
