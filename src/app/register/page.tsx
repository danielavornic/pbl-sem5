import PublicLayout from "@/layouts/public";

import ConfirmEmailDialog from "./components/email-dialog";
import { RegisterForm } from "./components/form";
import useRegister from "./hooks/use-register";

const RegisterPage = () => {
  return (
    <PublicLayout title="Creează un cont">
      <main className="container mt-[35px] flex items-start justify-center gap-[8vw]">
        <div className="flex h-[100%] w-[500px] justify-center">
          <div className="relative w-[490px]">
            <div className="absolute left-0 top-0 flex h-[235px] w-[235px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute left-[225px] top-[225px] flex h-[235px] w-[235px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute left-[225px] top-[470px] flex h-[235px] w-[235px] items-center justify-center rounded-[30px] bg-muted" />
            <div className="absolute top-[695px] flex h-[235px] w-[235px] items-center justify-center rounded-[30px] bg-muted" />
          </div>
        </div>
        <RegisterForm />
      </main>
    </PublicLayout>
  );
};

export default RegisterPage;
