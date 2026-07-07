"use client";

import React from "react";
import { 
  Users, 
  Banknote, 
  AlertOctagon, 
  TrendingUp,
  CreditCard,
  Droplet,
  UserPlus,
  FileText
} from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { RecentPayments } from "@/components/admin/dashboard/RecentPayments";
import { AdminActionIcon } from "@/components/admin/layout/AdminActionIcon";
import { MOCK_DASHBOARD_STATS, MOCK_PAYMENTS } from "@/lib/admin/mock-data";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const stats = MOCK_DASHBOARD_STATS;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight dark:text-slate-50">Dashboard</h2>
          <p className="text-slate-500 mt-1 dark:text-slate-400">Overview of collections and community health.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-10 border-slate-200 text-slate-700 font-medium hidden sm:flex">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Banknote className="w-4 h-4 mr-2" />
            Record Cash
          </Button>
          <AdminActionIcon aria-label="Add Member" className="h-10 w-10 sm:hidden">
            <UserPlus className="w-4 h-4" />
          </AdminActionIcon>
          <Button variant="outline" className="h-10 border-slate-200 text-slate-700 font-medium hidden sm:flex">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard 
          label="Total Collected" 
          metric={`₹${stats.totalCollected.toLocaleString("en-IN")}`}
          helper="This month"
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard 
          label="Pending Amount" 
          metric={`₹${stats.pendingAmount.toLocaleString("en-IN")}`}
          helper="Across all active members"
          icon={AlertOctagon}
          variant="destructive"
        />
        <StatsCard 
          label="Paid Members" 
          metric={stats.paidMembers}
          helper="Out of 168 active"
          icon={Users}
        />
        <StatsCard 
          label="Cash Handovers" 
          metric={stats.pendingCashHandovers}
          helper="Pending verification"
          icon={Banknote}
          variant="warning"
        />
      </div>

      {/* Secondary Stats & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          <RecentPayments payments={MOCK_PAYMENTS} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <StatsCard 
              label="Monthly Dues" 
              metric={`₹${stats.monthlyDues.toLocaleString("en-IN")}`}
              icon={CreditCard}
            />
            <StatsCard 
              label="Special Events" 
              metric={`₹${stats.specialEvents.toLocaleString("en-IN")}`}
              icon={Banknote}
            />
          </div>
        </div>

        {/* Right Column (Sidebar-like on Desktop) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
             <h3 className="text-base font-semibold text-slate-900 mb-4 dark:text-slate-50">Risk Summary</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Severe Defaulters</span>
                  <span className="text-sm font-bold text-red-600 font-mono bg-red-50 px-2 py-0.5 rounded-md dark:bg-red-500/10 dark:text-red-300">
                    {stats.defaulters}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 dark:bg-slate-700">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <Button variant="outline" className="w-full mt-2 text-sm">
                  View Follow-up List
                </Button>
             </div>
          </div>

          <StatsCard 
            label="Available Blood Donors" 
            metric={stats.availableDonors}
            helper="Ready for emergency"
            icon={Droplet}
            variant="destructive"
          />
        </div>
      </div>
    </div>
  );
}
