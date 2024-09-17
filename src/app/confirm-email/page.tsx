"use client";

import { useQuery } from "@tanstack/react-query";
import { MailCheck } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";

import { authApi } from "@/api/authApi";
import { Spinner } from "@/components/spinner";
import PublicLayout from "@/layouts/public";

const ConfirmEmail = () => {
  const [token] = useQueryState("token");
  const router = useRouter();

  const confirmEmail = useQuery({
    queryKey: ["confirm-email", { token }],
    queryFn: () => authApi.confirmEmail(token as string),
    enabled: !!token
  });

  useEffect(() => {
    if (confirmEmail.isSuccess) {
      toast.success(confirmEmail.data.message);
      router.push("/login");
    }
  }, [confirmEmail.isSuccess, confirmEmail.data, router]);

  return (
    <PublicLayout title="Confirmă adresa de email">
      <main className="flex h-full flex-col items-center justify-center pt-20">
        <MailCheck size={90} className="mb-4 text-secondary" />
        <h1 className="pb-20 text-3xl font-bold">Confirmă adresa de email</h1>
        {confirmEmail.isLoading && <Spinner />}
      </main>
    </PublicLayout>
  );
};

export default ConfirmEmail;
