"use client";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
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

  return (
    <div className="my-10">
      <h1 className="mb-4 text-3xl font-bold">Creează o nouă oportunitate</h1>
      <div className="mx-auto min-w-[500px] max-w-[500px]">
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
              name="isHighPriority"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">Prioritate înaltă</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
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

            <FormField
              control={form.control}
              name="sessions"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <FormLabel>Sesiuni</FormLabel>
                      <div className="my-4 space-y-2">
                        <FormLabel className="text-base text-gray-800">
                          Adăugați ziua și ora de început
                        </FormLabel>
                        <DateTimePicker
                          granularity="minute"
                          value={
                            field.value?.[0]?.startTime
                              ? new Date(field.value[0].startTime)
                              : undefined
                          }
                          onChange={(date) => {
                            const updatedSessions = field.value || [];
                            updatedSessions[0] = {
                              ...updatedSessions[0],
                              startTime: date?.toISOString() || ""
                            };
                            field.onChange(updatedSessions);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel className="text-base text-gray-800">
                          Adăugați ziua și ora de sfârșit
                        </FormLabel>
                        <DateTimePicker
                          granularity="minute"
                          value={
                            field.value?.[0]?.endTime ? new Date(field.value[0].endTime) : undefined
                          }
                          onChange={(date) => {
                            const updatedSessions = field.value || [];
                            updatedSessions[0] = {
                              ...updatedSessions[0],
                              endTime: date ? date.toISOString() : ""
                            };
                            field.onChange(updatedSessions);
                          }}
                        />
                      </div>
                      <div className="my-4">
                        <FormLabel className="text-base text-gray-800">
                          Locuri disponibile
                        </FormLabel>
                        <Input
                          type="number"
                          min="0"
                          value={field.value?.[0]?.spotsLeft || ""}
                          onChange={(e) => {
                            const updatedSessions = field.value || [];
                            updatedSessions[0] = {
                              ...updatedSessions[0],
                              spotsLeft: parseInt(e.target.value, 10) || 0
                            };
                            field.onChange(updatedSessions);
                          }}
                          placeholder="Locuri disponibile"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
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
