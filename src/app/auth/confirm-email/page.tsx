"use client";

import { useQuery } from "@tanstack/react-query";
import { MailCheck } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/spinner";
import PublicLayout from "@/layouts/public";

import { authApi } from "../queries";

const ConfirmEmail = () => {
  const [token] = useQueryState("token");
  const router = useRouter();

  const confirmEmail = useQuery({
    queryKey: ["confirm-email", { token }],
    queryFn: () => authApi.confirmEmail(token as string),
    enabled: !!token
  });

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (confirmEmail.isError) {
      toast.error("A apărut o eroare la confirmarea adresei de email");
      return;
    }

    if (confirmEmail.isSuccess) {
      if (confirmEmail.data.status === "SUCCESS") {
        toast.success(confirmEmail.data.message);
        router.push("/auth/login");
      } else {
        toast.error(confirmEmail.data.message);
        router.push("/");
      }
    }
  }, [confirmEmail.isSuccess, confirmEmail.data, confirmEmail.isError, router, token]);

  return (
    <PublicLayout title="Confirmă adresa de email">
      <main className="flex h-full w-full flex-col items-center justify-center pt-20">
        <MailCheck size={90} className="mb-4 text-secondary" />
        <h1 className="pb-20 text-3xl font-bold">Se confirmă adresa de email</h1>
        {confirmEmail.isLoading && <Spinner />}
      </main>
    </PublicLayout>
  );
};

export default ConfirmEmail;
