import PublicLayout from "@/layouts/public";

import ConfirmEmailDialog from "./components/email-dialog";
import { RegisterForm } from "./components/form";
import useRegister from "./hooks/use-register";

const RegisterPage = () => {
  return (
    <PublicLayout title="Creează un cont">
      <main className="container flex items-start justify-center gap-[10vw]">
        <div className="flex h-[100%] w-[500px] justify-center">
          <div className="relative w-[290px]">
            <div className="absolute left-0 top-0 flex h-[150px] w-[150px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute left-[140px] top-[140px] flex h-[150px] w-[150px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute left-[140px] top-[300px] flex h-[150px] w-[150px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute top-[440px] flex h-[150px] w-[150px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute left-[140px] top-[580px] flex h-[150px] w-[150px] items-center justify-center rounded-[30px] bg-muted" />
          </div>
        </div>
        <RegisterForm />
      </main>
    </PublicLayout>
  );
};

export default RegisterPage;
