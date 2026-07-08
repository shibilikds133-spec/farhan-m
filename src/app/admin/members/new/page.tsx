import React from "react";
import { MemberForm } from "@/components/admin/members/MemberForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewMemberPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/members" className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Add New Member</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Create a new membership profile.</p>
        </div>
      </div>
      
      <MemberForm isEdit={false} />
    </div>
  );
}
