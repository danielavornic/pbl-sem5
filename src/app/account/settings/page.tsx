import PublicLayout from "@/layouts/public";

import { AccountSidebar } from "../components/sidebar";
import { MfaView } from "./components/mfa.view";

const SettingsPage = () => {
  return (
    <PublicLayout title="Setări">
      <main className="container h-full py-10">
        <section>
          <h1 className="text-3xl font-semibold">Contul meu</h1>
          <div className="mt-8 flex">
            <AccountSidebar />
            <MfaView />
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default SettingsPage;
