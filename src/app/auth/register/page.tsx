import PublicLayout from "@/layouts/public";

import { RegisterForm } from "./components/form";

const RegisterPage = () => {
  return (
    <PublicLayout title="Creează un cont">
      <main className="container flex items-start justify-center gap-[8vw] py-9">
        <div className="grid w-[500px] grid-cols-2 justify-center gap-x-0 gap-y-3">
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px]" />
          <div className="h-[235px] rounded-[30px]" />
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px]" />
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px] bg-muted" />
          <div className="h-[235px] rounded-[30px]" />
        </div>
        <RegisterForm />
      </main>
    </PublicLayout>
  );
};

export default RegisterPage;
