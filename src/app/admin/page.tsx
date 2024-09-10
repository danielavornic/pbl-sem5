"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import AdminLayout from "@/layouts/admin";

const AdminDashboard = () => {
  useEffect(() => {
    return redirect("/admin/organizations");
  }, []);

  return <AdminLayout title="Admin" />;
};

export default AdminDashboard;
