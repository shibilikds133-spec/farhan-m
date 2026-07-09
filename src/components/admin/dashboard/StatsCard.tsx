"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatsCardProps {
  label: string;
  metric: string | number;
  helper?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  href?: string;
}

export function StatsCard({ 
  label, 
  metric, 
  helper, 
  icon: Icon,
  variant = "default",
  href
}: StatsCardProps) {
  
  const variantStyles = {
    default: "text-slate-900 dark:text-slate-50",
    success: "text-green-600",
    warning: "text-amber-600",
    destructive: "text-red-600",
  };

  const iconStyles = {
    default: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
    success: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-300",
    warning: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
    destructive: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300",
  };

  const isClickable = !!href;

  const cardContent = (
    <Card className={cn(
      "shadow-sm border-slate-200 overflow-hidden dark:border-slate-700 h-full",
      isClickable && "hover:shadow-md hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={cn("text-3xl font-bold font-mono tracking-tight", variantStyles[variant])}>
                {metric}
              </h3>
            </div>
            {helper && (
              <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{helper}</p>
            )}
          </div>
          {Icon && (
            <div className={cn("p-3 rounded-2xl", iconStyles[variant])}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isClickable) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
