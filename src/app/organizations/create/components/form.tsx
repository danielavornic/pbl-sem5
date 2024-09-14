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
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UploadedFilesCard } from "@/components/ui/uploaded-files-card";
import { cn } from "@/lib/utils";

import useCreateOrganization from "../hooks/use-create-organization";

// TODO: Update after API is ready
const CATEGORY_OPTIONS: Option[] = [
  { value: "1", label: "Mediu" },
  { value: "2", label: "Social" },
  { value: "3", label: "Educație" },
  { value: "4", label: "Sănătate" },
  { value: "5", label: "Serviciu Comunitar" },
  { value: "6", label: "Artă și Cultură" },
  { value: "7", label: "Sport" },
  { value: "8", label: "Protecția Animalelor" },
  { value: "9", label: "Drepturile Omului" },
  { value: "10", label: "Religie" },
  { value: "13", label: "Altele" }
];

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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn({ "border-destructive": form.formState.errors.region })}
                      >
                        <SelectValue placeholder="Selectează o regiune" />
                      </SelectTrigger>
                      <SelectContent className="h-[324px]">
                        <SelectGroup>
                          <SelectLabel>Chișinău</SelectLabel>
                          <SelectItem value="1">Ciocana</SelectItem>
                          <SelectItem value="2">Râșcani</SelectItem>
                          <SelectItem value="3">Centru</SelectItem>
                          <SelectItem value="4">Botanica</SelectItem>
                          <SelectItem value="5">Buiucani</SelectItem>
                        </SelectGroup>
                        <Separator />
                        <SelectItem value="6">Bălți</SelectItem>
                        <SelectItem value="7">Anenii Noi</SelectItem>
                        <SelectItem value="8">Basarabeasca</SelectItem>
                        <SelectItem value="9">Briceni</SelectItem>
                        <SelectItem value="10">Cahul</SelectItem>
                        <SelectItem value="11">Călărași</SelectItem>
                        <SelectItem value="12">Cantemir</SelectItem>
                        <SelectItem value="13">Căușeni</SelectItem>
                        <SelectItem value="14">Ciadâr-Lunga</SelectItem>
                        <SelectItem value="15">Cimișlia</SelectItem>
                        <SelectItem value="16">Comrat</SelectItem>
                        <SelectItem value="17">Criuleni</SelectItem>
                        <SelectItem value="18">Dondușeni</SelectItem>
                        <SelectItem value="19">Drochia</SelectItem>
                        <SelectItem value="20">Edineț</SelectItem>
                        <SelectItem value="21">Fălești</SelectItem>
                        <SelectItem value="22">Florești</SelectItem>
                        <SelectItem value="23">Glodeni</SelectItem>
                        <SelectItem value="24">Hîncești</SelectItem>
                        <SelectItem value="25">Ialoveni</SelectItem>
                        <SelectItem value="26">Leova</SelectItem>
                        <SelectItem value="27">Nisporeni</SelectItem>
                        <SelectItem value="28">Ocnița</SelectItem>
                        <SelectItem value="29">Orhei</SelectItem>
                        <SelectItem value="30">Rezina</SelectItem>
                        <SelectItem value="31">Rîșcani</SelectItem>
                        <SelectItem value="32">Sîngerei</SelectItem>
                        <SelectItem value="33">Soroca</SelectItem>
                        <SelectItem value="34">Strășeni</SelectItem>
                        <SelectItem value="35">Șoldănești</SelectItem>
                        <SelectItem value="36">Ștefan-Vodă</SelectItem>
                        <SelectItem value="37">Taraclia</SelectItem>
                        <SelectItem value="38">Telenești</SelectItem>
                        <SelectItem value="39">Ungheni</SelectItem>
                        <SelectItem value="40">UTA Găgăuzia</SelectItem>
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
