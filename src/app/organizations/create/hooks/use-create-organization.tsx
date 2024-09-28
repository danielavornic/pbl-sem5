"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { commonApi } from "@/api/common";
import { organizationApi } from "@/api/organizationApi";
import { useUploadFile } from "@/hooks/use-upload-file";
import { OrganizationCreateData } from "@/types";

export const organizationFormSchema = z.object({
  name: z.string().min(1, { message: "Numele organizației este obligatoriu" }),
  description: z.string().min(1, { message: "Descrierea organizației este obligatorie" }),
  regionId: z.string().min(1, { message: "Regiunea este obligatorie" }),
  address: z.string().min(1, { message: "Adresa organizației este obligatorie" }),
  categoryIds: z
    .array(z.string())
    .min(1, { message: "Trebuie să selectați cel puțin o categorie" }),
  website: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Adresa site-ului trebuie să fie validă" })
  ]),
  phoneNumber: z.string().min(1, { message: "Numărul de telefon este obligatoriu" }),
  logo: z.array(z.custom<File>())
});

const useCreateOrganization = () => {
  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      address: "",
      regionId: "",
      categoryIds: [],
      website: "",
      phoneNumber: "",
      logo: []
    }
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: commonApi.getCategories
  });

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: commonApi.getRegions
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
        regionId: +data.regionId,
        categoryIds: data.categoryIds.map((id) => +id),
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
        regionId: +formValues.regionId,
        categoryIds: formValues.categoryIds.map((id) => +id),
        logo: logoUrl
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, form]);

  return {
    form,
    onSubmit,
    isPending,
    onUpload,
    progresses,
    uploadedFiles,
    isUploading,
    categories,
    regions
  };
};

export default useCreateOrganization;
