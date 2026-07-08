import React from "react";
import { AuditLogTable } from "@/components/admin/audit/AuditLogTable";

export const metadata = {
  title: "Audit Log | SSF Alparamba Admin",
  description: "View system activity and track admin actions.",
};

export default function AuditLogPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Audit Log</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Track all admin actions, data changes, and system events for transparency and security.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <AuditLogTable />
      </div>
    </div>
  );
}
