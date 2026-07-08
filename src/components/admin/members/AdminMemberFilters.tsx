"use client";

import React from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminMemberFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  bloodGroupFilter: string;
  setBloodGroupFilter: (val: string) => void;
}

export function AdminMemberFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  bloodGroupFilter,
  setBloodGroupFilter,
}: AdminMemberFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Search members by name, phone, or ID..." 
          className="pl-9 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        <div className="relative min-w-[140px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative min-w-[140px]">
          <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
            <SelectTrigger className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Blood Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Blood Group (All)</SelectItem>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="shrink-0 h-10 px-3 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
}
