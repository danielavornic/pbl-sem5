"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DateTimePickerOpportunity } from "@/components/ui/date-time-picker-opportunity";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_OPTIONS } from "@/constants/categoryOptions";
import { REGION_OPTIONS } from "@/constants/regionOptions";
import { SKILL_OPTIONS } from "@/constants/skillOptions";
import { cn } from "@/lib/utils";

import useCreateOpportunity from "../hooks/use-create-opportunity";

export const CreateOpportunityForm = () => {
  const { form, onSubmit, isPending } = useCreateOpportunity();

  const [rows, setRows] = useState(1);

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
  };

  return (
    <div className="my-10">
      <h1 className="mb-4 text-3xl font-bold">Creează o nouă oportunitate</h1>
      <div className="mx-auto max-w-[620px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Titlu</FormLabel>
                  <FormControl>
                    <Input placeholder="Titlul oportunității" {...field} />
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
                    <Textarea placeholder="Descrieți oportunitatea..." {...field} />
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
                      <SelectContent>
                        {REGION_OPTIONS.map((option: Option) => (
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
              name="skills"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Abilități necesare</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      className={cn({ "border-destructive": form.formState.errors.skills })}
                      options={SKILL_OPTIONS}
                      placeholder="Selectează abilitățile necesare"
                      value={SKILL_OPTIONS.filter((option: Option) =>
                        field.value.includes(parseInt(option.value))
                      )}
                      onChange={(selectedValues) => {
                        const values = selectedValues.map((option) => parseInt(option.value));
                        field.onChange(values);
                      }}
                      emptyIndicator="Nu ați selectat nicio abilitate"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {[...Array(rows)].map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={"sessions[${index}]" as any}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel>Sesiune {index + 1}</FormLabel>
                        <div className="my-2 space-y-4">
                          <div className="flex space-x-4">
                            <div className="w-1/3 space-y-2 text-center">
                              <FormLabel className="text-body text-base text-gray-800">
                                Timp început
                              </FormLabel>
                              <DateTimePickerOpportunity
                                granularity="minute"
                                value={
                                  field.value?.[index]?.startTime
                                    ? new Date(field.value[index].startTime)
                                    : undefined
                                }
                                onChange={(date) => {
                                  const updatedSessions = field.value || [];
                                  updatedSessions[index] = {
                                    ...updatedSessions[index],
                                    startTime: date?.toISOString() || ""
                                  };
                                  field.onChange(updatedSessions);
                                }}
                              />
                            </div>
                            <div className="w-1/3 space-y-2 text-center">
                              <FormLabel className="text-body text-base text-gray-800">
                                Timp sfârșit
                              </FormLabel>
                              <DateTimePickerOpportunity
                                granularity="minute"
                                value={
                                  field.value?.[index]?.endTime
                                    ? new Date(field.value[index].endTime)
                                    : undefined
                                }
                                onChange={(date) => {
                                  const updatedSessions = field.value || [];
                                  updatedSessions[index] = {
                                    ...updatedSessions[index],
                                    endTime: date ? date.toISOString() : ""
                                  };
                                  field.onChange(updatedSessions);
                                }}
                              />
                            </div>
                            <div className="flex w-1/3 flex-col items-center justify-center space-y-2">
                              <FormLabel className="text-base text-gray-800">Nr. locuri</FormLabel>
                              <Input
                                className="max-w-[100px]"
                                type="number"
                                min="0"
                                value={field.value?.[index]?.spotsLeft || ""}
                                onChange={(e) => {
                                  const updatedSessions = field.value || [];
                                  updatedSessions[index] = {
                                    ...updatedSessions[index],
                                    spotsLeft: parseInt(e.target.value, 10) || 0
                                  };
                                  field.onChange(updatedSessions);
                                }}
                                placeholder="0"
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              <Button
                                onClick={addRow}
                                className="h-[34px] w-[34px] rounded-full p-0"
                              >
                                <Plus />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="isHighPriority"
              render={({ field }) => (
                <FormItem className="flex h-12 w-full flex-row items-center justify-between rounded-md border border-input bg-card px-4 py-2">
                  <FormLabel className="text-base">Prioritate înaltă</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <Button className="float-right" type="submit" loading={isPending}>
                {isPending ? "Se încarcă..." : "Creează oportunitatea"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateOpportunityForm;
