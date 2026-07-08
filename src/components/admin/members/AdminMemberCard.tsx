"use client";

import React from "react";
import { MoreVertical, Droplet, Clock } from "lucide-react";
import { Member } from "@/lib/admin/admin-types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AdminActionIcon } from "@/components/admin/layout/AdminActionIcon";

interface AdminMemberCardProps {
  member: Member;
}

export function AdminMemberCard({ member }: AdminMemberCardProps) {
  const isDefaulter = member.status === "inactive" || member.pinStatus === "reset_required";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-3 sm:hidden shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium">
            {member.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100 leading-tight">{member.name}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{member.memberId}</div>
          </div>
        </div>
        <Badge variant={member.status === "active" ? "success" : "secondary"}>
          {member.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-3">
        <div>
          <div className="text-xs text-slate-500 mb-0.5">Phone</div>
          <div className="font-mono text-slate-700 dark:text-slate-300">{member.phone}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-0.5">Area</div>
          <div className="text-slate-700 dark:text-slate-300 truncate">{member.area}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-0.5">Monthly Due</div>
          <div className="text-slate-700 dark:text-slate-300">₹{member.monthlyAmount} <span className="text-xs text-slate-500 capitalize">({member.monthlyTier})</span></div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-0.5">Status</div>
          {isDefaulter ? (
             <div className="text-red-600 dark:text-red-400 flex items-center text-xs mt-0.5 font-medium">
               <Clock className="w-3.5 h-3.5 mr-1" /> Overdue
             </div>
          ) : (
             <div className="text-slate-700 dark:text-slate-300 text-xs mt-0.5">Clear</div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 mt-1">
        <div className="flex gap-2">
          {member.bloodGroup && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 shadow-[0_2px_8px_rgba(220,38,38,0.08)]">
              <Droplet className="w-4 h-4 mr-1.5 fill-red-100 dark:fill-red-900/50 text-red-500" />
              {member.bloodGroup} {member.isBloodDonor ? "(Donor)" : ""}
            </span>
          )}
        </div>
        
        <Link href={`/admin/members/${member.id}`}>
          <AdminActionIcon aria-label="View Details" className="h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </AdminActionIcon>
        </Link>
      </div>
    </div>
  );
}
