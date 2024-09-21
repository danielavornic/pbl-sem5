"use client";

import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadedFilesCard } from "@/components/ui/uploaded-files-card";
import { CATEGORY_OPTIONS } from "@/constants/categoryOptions";
import { REGION_OPTIONS } from "@/constants/regionOptions";
import { cn } from "@/lib/utils";

import useCreateOrganization from "../hooks/use-create-organization";

export const CreateOrganizationForm = () => {
  const { form, onSubmit, isPending, isUploading, progresses, uploadedFiles } =
    useCreateOrganization();

  return (
    <div className="my-10">
      <h1 className="mb-4 text-3xl font-bold">Creează organizația ta</h1>
      <div className="mx-auto min-w-[500px] max-w-[500px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input placeholder="Denumirea oficială" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descriere</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Adăugați o scurtă descriere aici..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Regiune</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <SelectTrigger
                        className={cn({ "border-destructive": form.formState.errors.region })}
                      >
                        <SelectValue placeholder="Selectează o regiune" />
                      </SelectTrigger>
                      <SelectContent>
                        {REGION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Adresă</FormLabel>
                  <FormControl>
                    <Input placeholder="ex.: str. Independenței 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categorii</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      className={cn({ "border-destructive": form.formState.errors.categories })}
                      options={CATEGORY_OPTIONS}
                      placeholder="Selectează cel puțin o categorie"
                      value={CATEGORY_OPTIONS.filter((option) =>
                        field.value.includes(parseInt(option.value))
                      )}
                      onChange={(selectedValues) => {
                        const values = selectedValues.map((option) => parseInt(option.value));
                        field.onChange(values);
                      }}
                      emptyIndicator="Nu ați selectat nicio categorie"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Număr de telefon</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://www.exemplu.md" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFileCount={1}
                        maxSize={4 * 1024 * 1024}
                        progresses={progresses}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {uploadedFiles.length > 0 ? (
                    <UploadedFilesCard uploadedFiles={uploadedFiles} />
                  ) : null}
                </div>
              )}
            />

            <div>
              <Button className="float-right" type="submit" loading={isPending || isUploading}>
                {isPending ? "Se incarcă..." : "Creează organizația"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrganizationForm;
