"use client";

import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

import useRegiser from "../hooks/use-register";

export const RegisterForm = () => {
  const { form, onSubmit, isPending } = useRegiser();

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Înregistrează-te</CardTitle>
          <CardDescription>Completează câmpurile de mai jos pentru a te înregistra</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">Prenume</Label>
                <Input {...form.register("firstName")} placeholder="Prenume" />
                {form.formState.errors.firstName && (
                  <span className="text-red-500">{form.formState.errors.firstName.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Nume</Label>
                <Input {...form.register("lastName")} placeholder="Nume" />
                {form.formState.errors.lastName && (
                  <span className="text-red-500">{form.formState.errors.lastName.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Adresă de email</Label>
                <Input {...form.register("email")} placeholder="Adresă de email" />
                {form.formState.errors.email && (
                  <span className="text-red-500">{form.formState.errors.email.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNumber">Număr de telefon</Label>
                <Controller
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      placeholder="Număr de telefon"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                {form.formState.errors.phoneNumber && (
                  <span className="text-red-500">{form.formState.errors.phoneNumber.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Parolă</Label>
                <Input {...form.register("password")} type="password" placeholder="Parolă" />
                {form.formState.errors.password && (
                  <span className="text-red-500">{form.formState.errors.password.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirmă parola</Label>
                <Input
                  {...form.register("confirmPassword")}
                  type="password"
                  placeholder="Confirmă parola"
                />
                {form.formState.errors.confirmPassword && (
                  <span className="text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <CardFooter className="mt-6 flex-col items-start">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Se incarcă..." : "Înregistrează-te"}
              </Button>
              <p className="mt-4">
                Ai deja un cont? <a href="/login">Conectează-te la contul tău</a>
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
