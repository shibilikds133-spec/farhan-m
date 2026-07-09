import React from "react";
import { DefaultersManager } from "@/components/admin/defaulters/DefaultersManager";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const metadata = {
  title: "Pending Payments | SSF Alparamba Admin",
  description: "View and follow up with members who have pending dues.",
};

export default function DefaultersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Pending Payments</h2>
          <p className="text-slate-500 dark:text-slate-400">
            A polite overview of members who currently have pending dues, with options to send gentle reminders.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="mt-6">
        <DefaultersManager />
      </div>
    </div>
  );
}
