import React from "react";
import { SupportContactsManager } from "@/components/admin/settings/SupportContactsManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Support Contacts | SSF Alparamba Admin",
  description: "Manage admin contact numbers shown to members",
};

export default function SupportContactsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Support Contacts</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Manage the admin contact numbers shown in the member profile support drawer.
          </p>
        </div>
        
        <Button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Contact
        </Button>
      </div>

      <div className="mt-6">
        <SupportContactsManager />
      </div>
    </div>
  );
}
