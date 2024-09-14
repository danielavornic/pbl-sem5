"use client";

export const AdminTopbar = ({ title }: { title: string }) => {
  return (
    <div className="h-admin-topbar fixed flex w-screen items-center border-b bg-white px-8">
      <span className="font-heading text-2xl font-bold">{title}</span>
    </div>
  );
};
