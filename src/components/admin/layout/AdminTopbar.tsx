"use client";

import React from "react";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { AdminActionIcon } from "./AdminActionIcon";
import { useTheme } from "next-themes";

interface AdminTopbarProps {
  onOpenMobileMenu: () => void;
  title?: string;
}

export function AdminTopbar({ onOpenMobileMenu, title = "Admin Panel" }: AdminTopbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-[#F6F8FC] px-4 lg:px-8 border-b border-[#E5EAF3] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <AdminActionIcon aria-label="Search" className="hidden lg:flex">
          <Search className="w-5 h-5" />
        </AdminActionIcon>
        
        <AdminActionIcon aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </AdminActionIcon>

        <AdminActionIcon
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </AdminActionIcon>

        <div className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900 leading-none dark:text-slate-50">Farhan</p>
            <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">President</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold border border-blue-200 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300">
            FA
          </div>
        </div>
      </div>
    </header>
  );
}
