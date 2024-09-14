import PublicLayout from "@/layouts/public";

import { LoginForm } from "./components/form";

const LoginPage = () => {
  return (
    <PublicLayout title="Intră în cont">
      <main className="h-without-topbar container flex items-center justify-center gap-[15vw]">
        <div>
          <div className="flex h-[500px] w-[26vw] items-center justify-center rounded-[30px] bg-muted" />
        </div>
        <LoginForm />
      </main>
    </PublicLayout>
  );
};

export default LoginPage;
