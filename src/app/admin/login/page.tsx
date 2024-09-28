import PublicLayout from "@/layouts/public";

import { AdminLoginForm } from "./components/form";

const AdminLoginPage = () => {
  return (
    <PublicLayout title="Admin Login">
      <main className="h-without-topbar flex w-full items-center justify-center">
        <AdminLoginForm />
      </main>
    </PublicLayout>
  );
};

export default AdminLoginPage;
