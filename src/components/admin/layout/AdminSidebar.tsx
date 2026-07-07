"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Banknote, 
  Wallet, 
  AlertOctagon, 
  BarChart3, 
  Droplet, 
  History, 
  Settings 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Members", href: "/admin/members", icon: Users },
  { name: "Cash Entry", href: "/admin/cash-entry", icon: Banknote },
  { name: "Payments", href: "/admin/payments", icon: Wallet },
  { name: "Defaulters", href: "/admin/defaulters", icon: AlertOctagon },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Blood Donors", href: "/admin/blood-donors", icon: Droplet },
  { name: "Audit Log", href: "/admin/audit-log", icon: History },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen fixed left-0 top-0 bg-white border-r border-[#E2E8F0] z-20 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-[#E2E8F0] dark:border-slate-700">
        <Link href="/admin/dashboard" className="flex flex-col">
          <span className="font-cooper text-2xl leading-none text-slate-900 dark:text-slate-50">SSF</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Alparamba Unit</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-colors",
                isActive 
                  ? "bg-slate-50 text-blue-600 border border-slate-200 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400 dark:shadow-none" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
