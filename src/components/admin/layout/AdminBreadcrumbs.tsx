"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  
  if (!pathname || pathname === "/admin") return null;

  const paths = pathname.split("/").filter(Boolean);
  // Remove "admin" from the start for breadcrumbs if desired, or keep it.
  // Let's keep it but capitalize
  
  return (
    <nav className="hidden sm:flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

        return (
          <React.Fragment key={path}>
            {index > 0 && <ChevronRight className="size-4 mx-2 text-slate-300 dark:text-slate-600" />}
            {isLast ? (
              <span className="text-slate-900 dark:text-slate-50 font-semibold">{title}</span>
            ) : (
              <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
