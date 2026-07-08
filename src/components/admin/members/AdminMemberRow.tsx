"use client";

import React from "react";
import { MoreHorizontal, Droplet, Clock } from "lucide-react";
import { Member } from "@/lib/admin/admin-types";
import { Badge } from "@/components/ui/badge";
import { AdminActionIcon } from "@/components/admin/layout/AdminActionIcon";
import Link from "next/link";

interface AdminMemberRowProps {
  member: Member;
}

export function AdminMemberRow({ member }: AdminMemberRowProps) {
  const isDefaulter = member.status === "inactive" || member.pinStatus === "reset_required";
  
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="py-4 pl-4 pr-3 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium">
            {member.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100">{member.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{member.memberId}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
        <div className="font-mono">{member.phone}</div>
        <div className="text-xs text-slate-500">{member.area}</div>
      </td>
      <td className="px-3 py-4">
        {member.bloodGroup && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 shadow-[0_2px_8px_rgba(220,38,38,0.08)] transition-all">
            <Droplet className="w-3.5 h-3.5 mr-1.5 fill-red-100 dark:fill-red-900/50 text-red-500" />
            {member.bloodGroup}
          </span>
        )}
      </td>
      <td className="px-3 py-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium text-slate-900 dark:text-slate-100">
            ₹{member.monthlyAmount}
          </span>
          <span className="text-xs text-slate-500 capitalize">/ {member.monthlyTier}</span>
        </div>
        {isDefaulter && (
          <div className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </div>
        )}
      </td>
      <td className="px-3 py-4">
        <Badge variant={member.status === "active" ? "success" : "secondary"}>
          {member.status}
        </Badge>
      </td>
      <td className="py-4 pr-4 pl-3 sm:pr-6 text-right">
        <div className="flex justify-end gap-2">
           <Link href={`/admin/members/${member.id}`}>
              <AdminActionIcon aria-label="View Details" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </AdminActionIcon>
           </Link>
        </div>
      </td>
    </tr>
  );
}
