"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import React, { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "hidden h-full w-[300px] flex-shrink-0 bg-foreground px-4 pb-4 md:flex md:flex-col",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "70px") : "300px"
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between bg-foreground px-4 py-4 md:hidden"
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <Menu className="text-background" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-background p-10",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-background"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "group/sidebar flex items-center justify-start rounded-md px-3 py-3 font-semibold",
        { "justify-center rounded-full px-1 py-2": !open },
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className={cn(
          "m-0 inline-block whitespace-pre !p-0 text-background transition duration-150 group-hover/sidebar:translate-x-1",
          {
            "ml-2": open
          }
        )}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export const SidebarItem = ({
  icon,
  label,
  className,
  onClick,
  ...props
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}) => {
  const { open, animate } = useSidebar();
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/sidebar flex cursor-pointer items-center justify-start rounded-md px-3 py-3 font-semibold",
        { "justify-center rounded-full px-1 py-2": !open },
        className
      )}
      {...props}
    >
      {icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className={cn(
          "m-0 inline-block whitespace-pre !p-0 text-background transition duration-150 group-hover/sidebar:translate-x-1",
          {
            "ml-2": open
          }
        )}
      >
        {label}
      </motion.span>
    </div>
  );
};

export const SidebarLogo = () => {
  const { open, animate } = useSidebar();
  return (
    <div className="h-admin-topbar flex items-center">
      <Image src="/icon.svg" className="flex-shrink-0" width={38} height={38} alt="Logo" />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className={cn(
          "m-0 inline-block cursor-default whitespace-pre !p-0 text-lg font-medium text-background transition duration-150 group-hover/sidebar:translate-x-1",
          {
            "ml-3": open
          }
        )}
      >
        voluntariat admin
      </motion.span>
    </div>
  );
};
