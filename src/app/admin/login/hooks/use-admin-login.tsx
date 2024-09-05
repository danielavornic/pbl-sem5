"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { authApi } from "@/api/authApi";
import { AdminCredentials } from "@/types";

export const formSchema = z.object({
  username: z.string().min(1, { message: "Numele de utilizator este obligatoriu" }),
  password: z.string().min(1, { message: "Parola este obligatorie" })
});

const useAdminLogin = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AdminCredentials) => authApi.loginAdmin(data),
    onSuccess: () => {
      router.push("/admin");
    },
    onError: (error: any) => {
      toast.error("Eroare la autentificare", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: AdminCredentials) => {
    mutate(data);
  };

  return { form, onSubmit, isPending };
};

export default useAdminLogin;
