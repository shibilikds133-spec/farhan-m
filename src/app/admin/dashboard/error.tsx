"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center px-4">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
        <AlertOctagon className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">Failed to load Dashboard</h2>
      <p className="text-slate-500 max-w-md">
        There was a problem fetching the latest dashboard statistics. Please try again.
      </p>
      <Button onClick={() => reset()} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
        <RefreshCw className="w-4 h-4 mr-2" />
        Retry
      </Button>
    </div>
  );
}
