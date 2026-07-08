import React from "react";
import { SettingsDashboard } from "@/components/admin/settings/SettingsDashboard";

export const metadata = {
  title: "Settings | SSF Alparamba Admin",
  description: "Configure system settings, admins, and events.",
};

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Manage admin access, payment configurations, and system preferences.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <SettingsDashboard />
      </div>
    </div>
  );
}
