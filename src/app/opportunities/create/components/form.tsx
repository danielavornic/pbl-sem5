"use client";

import { addMinutes, endOfDay, isBefore, startOfDay } from "date-fns";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DateTimePickerOpportunity } from "@/components/ui/date-time-picker-opportunity";
import { FileUploader } from "@/components/ui/file-uploader";
import {
  Form,
  FormControl,
  FormDescription,
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
import { UploadedFilesCard } from "@/components/ui/uploaded-files-card";
import { CATEGORY_OPTIONS } from "@/constants/categoryOptions";
import { REGION_OPTIONS } from "@/constants/regionOptions";
import { SKILL_OPTIONS } from "@/constants/skillOptions";
import { cn } from "@/lib/utils";

import useCreateOpportunity from "../hooks/use-create-opportunity";

export const CreateOpportunityForm = () => {
  const {
    form,
    onSubmit,
    isPending,
    fields,
    append,
    remove,
    canAddSession,
    progresses,
    uploadedFiles,
    isUploading,
    skills,
    categories,
    regions
  } = useCreateOpportunity();

  const addSession = () => {
    append({ startTime: "", endTime: "", spotsLeft: 0 });
  };

  const removeSession = (index: number) => {
    remove(index);
  };

  return (
    <div className="my-10">
      <h1 className="mb-4 text-3xl font-bold">Creează o nouă oportunitate</h1>
      <div className="mx-auto w-[700px] max-w-[720px]">
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
                        {regions && regions?.length > 0 ? (
                          regions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="0">Loading...</SelectItem>
                        )}
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
                      options={categories}
                      placeholder="Selectează cel puțin o categorie"
                      value={(categories || []).filter((option) =>
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
                      options={skills}
                      placeholder="Selectează abilitățile necesare"
                      value={(skills || []).filter((option: Option) =>
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

            <div>
              <FormLabel>Sesiuni</FormLabel>
              <FormDescription>
                Specificați data, ora de început și de sfârșit pentru această sesiune. Asigurați-vă
                că ambele ore sunt în aceeași zi în viitor și că numărul de locuri este introdus
                corect.
              </FormDescription>
            </div>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`sessions.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div>
                        <div className="flex items-center space-x-2">
                          <FormLabel>Sesiune {index + 1}</FormLabel>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="link-destructive"
                              size="xs"
                              className="h-auto p-0 pl-2 underline-offset-4"
                              onClick={() => removeSession(index)}
                            >
                              Șterge
                            </Button>
                          )}
                        </div>

                        <div className="my-2 space-y-4">
                          <div className="flex space-x-4">
                            <div className="w-[44%] space-y-2">
                              <FormLabel className="font-body">Timp început</FormLabel>
                              <DateTimePickerOpportunity
                                value={
                                  field.value.startTime
                                    ? new Date(field.value.startTime)
                                    : undefined
                                }
                                onChange={(date) => {
                                  form.setValue(
                                    `sessions.${index}.startTime`,
                                    date?.toISOString() || ""
                                  );
                                  if (
                                    date &&
                                    (!field.value.endTime ||
                                      isBefore(new Date(field.value.endTime), addMinutes(date, 5)))
                                  ) {
                                    form.setValue(
                                      `sessions.${index}.endTime`,
                                      addMinutes(date, 5).toISOString()
                                    );
                                  }
                                  form.trigger(`sessions.${index}`);
                                }}
                                minDate={startOfDay(new Date())}
                              />
                            </div>
                            <div className="w-[44%] space-y-2">
                              <FormLabel className="text-body">Timp sfârșit</FormLabel>
                              <DateTimePickerOpportunity
                                value={
                                  field.value.endTime ? new Date(field.value.endTime) : undefined
                                }
                                onChange={(date) => {
                                  form.setValue(
                                    `sessions.${index}.endTime`,
                                    date?.toISOString() || ""
                                  );
                                  form.trigger(`sessions.${index}`);
                                }}
                                minDate={
                                  field.value.startTime
                                    ? addMinutes(new Date(field.value.startTime), 5)
                                    : startOfDay(new Date())
                                }
                                maxDate={
                                  field.value.startTime
                                    ? endOfDay(new Date(field.value.startTime))
                                    : undefined
                                }
                                hideCalendar
                              />
                            </div>
                            <div className="w-[12%] space-y-2">
                              <FormLabel className="text-body">Nr. locuri</FormLabel>
                              <Input
                                className="w-full"
                                type="number"
                                min="0"
                                value={field.value.spotsLeft || ""}
                                onChange={(e) => {
                                  form.setValue(
                                    `sessions.${index}.spotsLeft`,
                                    parseInt(e.target.value, 10) || 0
                                  );
                                  form.trigger(`sessions.${index}`);
                                }}
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <div>
              <Button
                onClick={addSession}
                type="button"
                size="sm"
                variant="link-accent"
                className="mb-4 h-auto p-0"
                disabled={!canAddSession}
              >
                <Plus size={16} className="mr-2" />
                Adaugă sesiune
              </Button>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Imagine</FormLabel>
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
              <Button className="float-right" type="submit" loading={isPending || isUploading}>
                {isPending || isUploading ? "Se încarcă..." : "Creează oportunitatea"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateOpportunityForm;
