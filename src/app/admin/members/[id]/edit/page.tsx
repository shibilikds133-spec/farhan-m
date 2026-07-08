"use client";

import React from "react";
import { MemberForm } from "@/components/admin/members/MemberForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_MEMBERS } from "@/lib/admin/mock-data";
import { Button } from "@/components/ui/button";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  
  const member = MOCK_MEMBERS.find((m) => m.id === params.id);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Member Not Found</h2>
        <Button onClick={() => router.push("/admin/members")}>Back to Directory</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/admin/members/${member.id}`} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Edit Member</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Update {member.name}'s profile.</p>
        </div>
      </div>
      
      <MemberForm isEdit={true} initialData={member} />
    </div>
  );
}
