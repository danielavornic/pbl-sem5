"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { organizationApi } from "@/api/organizationApi";
import { OrganizationCreateData } from "@/types";

export const organizationFormSchema = z.object({
  name: z.string().min(1, { message: "Numele organizației este obligatoriu" }),
  description: z.string().min(1, { message: "Descrierea organizației este obligatorie" }),
  address: z.string().min(1, { message: "Adresa organizației este obligatorie" }),
  region: z.string().min(1, { message: "Regiunea organizației este obligatorie" }),
  categories: z.array(z.number()).min(1, { message: "Trebuie să selectați cel puțin o categorie" }),
  website: z.string().url({ message: "URL-ul website-ului trebuie să fie valid" }),
  phoneNumber: z.string().min(1, { message: "Numărul de telefon este obligatoriu" })
});

const useCreateOrganization = () => {
  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      address: "",
      region: "",
      categories: [],
      website: "",
      phoneNumber: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OrganizationCreateData) => organizationApi.create(data),
    onSuccess: () => {
      toast.success("Organizația a fost creată cu succes");
      form.reset();
    },
    onError: (error: any) => {
      toast.error("Eroare la crearea organizației", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: z.infer<typeof organizationFormSchema>) => {
    mutate({
      name: data.name,
      description: data.description,
      address: data.address,
      region: data.region,
      categories: data.categories,
      website: data.website,
      phoneNumber: data.phoneNumber
    });
  };

  return { form, onSubmit, isPending };
};

export default useCreateOrganization;
