import PublicLayout from "@/layouts/public";

import { AccountSidebar } from "./components/sidebar";

const menuItems = [
  {
    title: "Informații personale",
    href: "/account"
  },
  {
    title: "Autentificare în doi pași",
    href: "/account/mfa"
  }
];

const AccountPage = () => {
  return (
    <PublicLayout title="Contul meu">
      <main className="container py-10">
        <section>
          <h1 className="text-3xl font-semibold">Contul meu</h1>

          <div className="mt-8 flex">
            <AccountSidebar />
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default AccountPage;
