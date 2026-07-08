import React from "react";
import { ReportsDashboard } from "@/components/admin/reports/ReportsDashboard";

export const metadata = {
  title: "Reports & Analytics | SSF Alparamba Admin",
  description: "View collection reports and analytics.",
};

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Reports & Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Generate and export financial reports for the unit.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <ReportsDashboard />
      </div>
    </div>
  );
}
