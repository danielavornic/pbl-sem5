import PublicLayout from "@/layouts/public";

import { AccountSidebar } from "./components/sidebar";

const AccountPage = () => {
  return (
    <PublicLayout title="Contul meu">
      <main className="container h-full py-10">
        <section>
          <h1 className="text-3xl font-semibold">Contul meu</h1>

          <div className="mt-8 flex">
            <AccountSidebar />

            <div className="flex-1">
              <h2 className="mt-20 text-center text-xl font-semibold">Coming Soon</h2>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default AccountPage;
