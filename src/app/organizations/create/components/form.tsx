"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
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
  const { form, onSubmit, isPending } = useCreateOrganization();

  return (
    <>
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
                      <Select {...field} onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                          className={cn({ "border-destructive": form.formState.errors.region })}
                        >
                          <SelectValue placeholder="Selectează o regiune" />
                        </SelectTrigger>
                        <SelectContent className="h-[240px]">
                          <SelectGroup>
                            <SelectLabel>Chișinău</SelectLabel>
                            <SelectItem value="1">Ciocana</SelectItem>
                            <SelectItem value="2">Râșcani</SelectItem>
                            <SelectItem value="3">Centru</SelectItem>
                            <SelectItem value="4">Botanica</SelectItem>
                            <SelectItem value="5">Buiucani</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Chișinău</SelectLabel>
                            <SelectItem value="6">Ciocana</SelectItem>
                            <SelectItem value="7">Râșcani</SelectItem>
                            <SelectItem value="8">Centru</SelectItem>
                            <SelectItem value="9">Botanica</SelectItem>
                            <SelectItem value="10">Buiucani</SelectItem>
                          </SelectGroup>
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

              <div>
                <Button className="float-right" type="submit" loading={isPending}>
                  {isPending ? "Se incarcă..." : "Creează organizația"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
