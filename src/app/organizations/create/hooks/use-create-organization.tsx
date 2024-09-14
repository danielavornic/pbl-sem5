"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { organizationApi } from "@/api/organizationApi";
import { useUploadFile } from "@/hooks/use-upload-file";
import { OrganizationCreateData } from "@/types";

export const organizationFormSchema = z.object({
  name: z.string().min(1, { message: "Numele organizației este obligatoriu" }),
  description: z.string().min(1, { message: "Descrierea organizației este obligatorie" }),
  region: z.string().min(1, { message: "Localitatea organizației este obligatorie" }),
  address: z.string().min(1, { message: "Adresa organizației este obligatorie" }),
  categories: z.array(z.number()).min(1, { message: "Trebuie să selectați cel puțin o categorie" }),
  website: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Adresa site-ului trebuie să fie validă" })
  ]),
  phoneNumber: z.string().min(1, { message: "Numărul de telefon este obligatoriu" }),
  logo: z.array(z.instanceof(File))
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
      phoneNumber: "",
      logo: []
    }
  });

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile("imageUploader", {
    defaultUploadedFiles: []
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OrganizationCreateData) => organizationApi.create(data),
    onSuccess: () => {
      toast.success("Organizația a fost creată cu succes", {
        description: "Organizația a fost creată cu succes și va fi verificată de un administrator"
      });
      form.reset();
    },
    onError: (error: any) => {
      toast.error("Eroare la crearea organizației", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: z.infer<typeof organizationFormSchema>) => {
    if (data.logo.length === 0) {
      mutate({
        name: data.name,
        description: data.description,
        address: data.address,
        region: data.region,
        categories: data.categories,
        website: data.website,
        phoneNumber: data.phoneNumber
      });

      return;
    }

    onUpload(data.logo);
  };

  useEffect(() => {
    if (uploadedFiles.length) {
      const formValues = form.getValues();
      const logoUrl = uploadedFiles[0].url;

      mutate({
        ...formValues,
        logo: logoUrl
      });
    }
  }, [uploadedFiles, form, mutate]);

  return { form, onSubmit, isPending, onUpload, progresses, uploadedFiles, isUploading };
};

export default useCreateOrganization;
