import PublicLayout from "@/layouts/public";
import Image from "next/image";

import { LoginForm } from "./components/form";

const LoginPage = () => {
  return (
    <PublicLayout title="Intră în cont">
      <main className="h-without-topbar container flex items-center justify-center gap-[12vw]">
        <div className="grid w-[440px] grid-cols-2 justify-center gap-x-2 gap-y-2">
          <div className="h-[214px] overflow-hidden">
            <Image src="/square1.svg" alt="Square 1" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square8.svg" alt="Square 8" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square3.svg" alt="Square 3" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square6.svg" alt="Square 6" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/sun.svg" alt="Square 9" width={214} height={214} />
          </div>
          <div className="h-[214px] overflow-hidden">
            <Image src="/square10.svg" alt="Square 10" width={214} height={214} />
          </div>
        </div>
        <LoginForm />
      </main>
    </PublicLayout>
  );
};

export default LoginPage;
