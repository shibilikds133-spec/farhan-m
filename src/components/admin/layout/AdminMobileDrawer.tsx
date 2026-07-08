"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { X, LayoutDashboard, Users, Banknote, Wallet, AlertOctagon, BarChart3, Droplet, History, Settings, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminActionIcon } from "./AdminActionIcon";

interface AdminMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function AdminMobileDrawer({ isOpen, onClose }: AdminMobileDrawerProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isThemeMounted, setIsThemeMounted] = useState(false);
  
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setIsThemeMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E2E8F0] dark:border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <img src="/logo/logo-transparent.svg" alt="SSF Logo" className="h-8 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-cooper text-2xl leading-none text-slate-900 dark:text-slate-50">SSF</span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Alparamba Unit</span>
            </div>
          </Link>
          
          <AdminActionIcon onClick={onClose} aria-label="Close menu" className="h-9 w-9">
            <X className="w-4 h-4" />
          </AdminActionIcon>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                  isActive 
                    ? "bg-slate-50 text-blue-600 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-blue-400 dark:shadow-none" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800">
                FA
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-none">Farhan</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">President</p>
              </div>
            </div>
            
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {isThemeMounted && isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
