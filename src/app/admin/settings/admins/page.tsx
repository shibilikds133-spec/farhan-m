import React from "react";
import { AdminUsersManager } from "@/components/admin/settings/AdminUsersManager";

export const metadata = {
  title: "Admin Users | SSF Alparamba Admin",
  description: "Manage admin roles and access.",
};

export default function AdminUsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Admin Users</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Manage admin access, assign roles, and handle Super Admin privileges.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <AdminUsersManager />
      </div>
    </div>
  );
}
