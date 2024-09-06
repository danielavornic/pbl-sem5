"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { authApi } from "@/api/authApi";
import { PASSWORD_REGEX } from "@/lib/auth";
import { UserRegisterCredentials } from "@/types";

export const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "Prenumele este obligatoriu" }),
    lastName: z.string().min(1, { message: "Numele este obligatoriu" }),
    email: z
      .string()
      .min(1, { message: "Adresa de email este obligatorie" })
      .email({ message: "Introduceți o adresă de email validă" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Numărul de telefon este obligatoriu" })
      .refine(isValidPhoneNumber, { message: "Număr de telefon invalid" }),
    password: z
      .string()
      .min(8, { message: "Parola trebuie să conțină cel puțin 8 caractere" })
      .regex(
        PASSWORD_REGEX,
        "Parola trebuie să conțină cel puțin o literă mare, o literă mică, un număr și un caracter special"
      ),
    confirmPassword: z.string().min(1, { message: "Confirmați parola" })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Parolele nu se potrivesc",
        path: ["confirmPassord"]
      });
    }
  });

const useRegiser = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserRegisterCredentials) => authApi.register(data),
    onSuccess: () => {
      router.push("/confirm-email");
    },
    onError: (error: any) => {
      toast.error("Eroare la inregistrare", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: UserRegisterCredentials) => {
    mutate(data);
  };

  return { form, onSubmit, isPending };
};

export default useRegiser;
