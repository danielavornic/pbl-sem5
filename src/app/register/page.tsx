import PublicLayout from "@/layouts/public";

import ConfirmEmailDialog from "./components/email-dialog";
import { RegisterForm } from "./components/form";
import useRegister from "./hooks/use-register";

const RegisterPage = () => {
  return (
    <PublicLayout title="Creează un cont">
      <main className="container flex items-center justify-center gap-[15vw] py-12">
        <div>
          <div className="flex h-[600px] w-[26vw] items-center justify-center rounded-md bg-muted" />
        </div>
        <RegisterForm />
      </main>
    </PublicLayout>
  );
};

export default RegisterPage;
