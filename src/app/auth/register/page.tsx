import PublicLayout from "@/layouts/public";
import Image from "next/image";
import { RegisterForm } from "./components/form";

const RegisterPage = () => {
  return (
    <PublicLayout title="Creează un cont">
      <main className="container flex items-start justify-center gap-[12vw] py-9">
        <div className="grid w-[490px] grid-cols-2 justify-center gap-x-2 gap-y-2">
          <div className="h-[240px] overflow-hidden">
            <Image src="/square1.svg" alt="Square 1" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/square2.svg" alt="Square 2" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/square3.svg" alt="Square 3" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/square4.svg" alt="Square 4" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/square8.svg" alt="Square 8" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/square10.svg" alt="Square 10" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/square6.svg" alt="Square 6" width={240} height={240} />
          </div>
          <div className="h-[240px] overflow-hidden">
            <Image src="/sun.svg" alt="Square 9" width={240} height={240} />
          </div>
        </div>
        <RegisterForm />
      </main>
    </PublicLayout>
  );
};

export default RegisterPage;
