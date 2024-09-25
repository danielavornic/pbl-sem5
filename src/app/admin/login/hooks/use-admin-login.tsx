"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { adminApi } from "@/app/admin/login/queries";
import useUserStore from "@/lib/user-store";
import { LoginCredentials } from "@/types";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({ message: "Introduceti o adresa de email valida" }),
  password: z.string().min(1, { message: "Parola este obligatorie" })
});

const useAdminLogin = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginCredentials) => adminApi.loginAdmin(data),
    onSuccess: (data) => {
      if (data?.userInfo === null || !data?.userInfo) {
        toast.error("Eroare la autentificare", {
          description: "Nume de utilizator sau parolă greșită"
        });
        return;
      }

      setUser(data.userInfo);
      router.push("/admin");
    },
    onError: (error: any) => {
      toast.error("Eroare la autentificare", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: LoginCredentials) => mutate(data);

  return { form, onSubmit, isPending };
};

export default useAdminLogin;
