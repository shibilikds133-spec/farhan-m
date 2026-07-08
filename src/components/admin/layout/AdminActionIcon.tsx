"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AdminActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  "aria-label": string;
}

export function AdminActionIcon({ children, className, ...props }: AdminActionIconProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-200 hover:scale-105 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-none dark:hover:bg-slate-700 dark:hover:text-blue-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
