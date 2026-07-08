"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, Users, Banknote, Calendar } from "lucide-react";
import { toast } from "sonner";

export function ReportsDashboard() {
  const [reportType, setReportType] = useState("monthly");

  const handleExport = () => {
    toast.success("Report export started...");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative min-w-[200px]">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Collection Summary</SelectItem>
                <SelectItem value="dues">Dues Collection Report</SelectItem>
                <SelectItem value="events">Special Events Report</SelectItem>
                <SelectItem value="method">Payment Method Split</SelectItem>
                <SelectItem value="defaulters">Pending Dues Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative min-w-[160px]">
            <Select defaultValue="july-2026">
              <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="july-2026">July 2026</SelectItem>
                <SelectItem value="june-2026">June 2026</SelectItem>
                <SelectItem value="may-2026">May 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={handleExport} className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <Banknote className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Collected</h3>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">₹45,200</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% from last month
          </div>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Dues</h3>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">₹25,000</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">55% of total</div>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Special Events</h3>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">₹20,200</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">45% of total</div>
        </Card>

        <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Paid Members</h3>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">125</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">82% collection rate</div>
        </Card>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 min-h-[300px] flex flex-col items-center justify-center text-slate-400">
          <TrendingUp className="w-10 h-10 mb-3 opacity-20" />
          <p>Collection Trend Chart Area</p>
        </Card>
        <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 min-h-[300px] flex flex-col items-center justify-center text-slate-400">
          <Banknote className="w-10 h-10 mb-3 opacity-20" />
          <p>Payment Method Split Chart Area</p>
        </Card>
      </div>
    </div>
  );
}
