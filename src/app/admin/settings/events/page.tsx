import React from "react";
import { EventsConfigManager } from "@/components/admin/settings/EventsConfigManager";

export const metadata = {
  title: "Special Events | SSF Alparamba Admin",
  description: "Create and manage special donation events.",
};

export default function EventsSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Special Events</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Create, edit, and manage active donation campaigns.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <EventsConfigManager />
      </div>
    </div>
  );
}
