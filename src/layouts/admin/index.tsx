"use client";

import { Building, CalendarHeart, LogOut, UsersRound } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Sidebar, SidebarBody, SidebarLink, SidebarLogo } from "./sidebar";
import { AdminTopbar } from "./topbar";

interface AdminLayoutProps {
  title: string;
}

const links = [
  {
    label: "Organizații",
    href: "/admin/organizations",
    icon: <Building className="h-5 w-5 flex-shrink-0 text-background" />
  },
  {
    label: "Oportunități",
    href: "/admin/opportunities",
    icon: <CalendarHeart className="h-5 w-5 flex-shrink-0 text-background" />
  },
  {
    label: "Utilizatori",
    href: "/admin/users",
    icon: <UsersRound className="h-5 w-5 flex-shrink-0 text-background" />
  }
];

const AdminLayout = ({ title, children }: React.PropsWithChildren<AdminLayoutProps>) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      <title>{title}</title>

      <div className="mx-auto flex h-screen w-full flex-1 flex-col overflow-hidden bg-background md:flex-row">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div>
              <SidebarLogo />
              <Separator className="opacity-20" />
              <div className="mt-8 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink
                      key={idx}
                      link={link}
                      className={pathname === link.href ? "bg-secondary/5 opacity-100" : ""}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Deconectare",
                  href: "/admin/login",
                  icon: (
                    <LogOut className="h-5 w-5 flex-shrink-0 rotate-180 transform text-background" />
                  )
                }}
              />
              <Separator className="my-4 opacity-20" />
              <SidebarLink
                link={{
                  label: "logged user",
                  href: "#",
                  icon: (
                    <Image
                      src="/images/avatar.png"
                      className="flex-shrink-0 rounded-full"
                      width={28}
                      height={28}
                      alt="Avatar"
                    />
                  )
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="h-screen w-full">
          <AdminTopbar title={title} />
          <ScrollArea className="mt-admin-topbar h-without-admin-topbar px-8">
            {children}
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
