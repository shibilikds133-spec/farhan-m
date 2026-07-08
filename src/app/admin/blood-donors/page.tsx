import React from "react";
import { BloodDonorsManager } from "@/components/admin/donors/BloodDonorsManager";

export const metadata = {
  title: "Blood Donors | SSF Alparamba Admin",
  description: "Manage blood donor directory and availability.",
};

export default function BloodDonorsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Blood Donors</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Manage the blood donor directory and update availability status.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <BloodDonorsManager />
      </div>
    </div>
  );
}
