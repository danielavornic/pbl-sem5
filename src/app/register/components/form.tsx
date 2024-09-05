"use client";

import useRegiser from "../hooks/use-register";

export const RegisterForm = () => {
  const { form, onSubmit, isPending } = useRegiser();

  return <div>RegisterForm</div>;
};
