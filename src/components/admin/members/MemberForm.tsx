"use client";

import React, { useState } from "react";
import { Member } from "@/lib/admin/admin-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface MemberFormProps {
  initialData?: Member;
  isEdit?: boolean;
}

export function MemberForm({ initialData, isEdit }: MemberFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/members");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300 pb-24">
      
      {/* 1. Basic Details */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">1. Basic Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input id="name" defaultValue={initialData?.name} required placeholder="e.g. Niyas C" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input id="phone" defaultValue={initialData?.phone} required placeholder="10-digit mobile number" pattern="[0-9]{10}" title="10 digit phone number" />
          </div>
          <div className="space-y-2">
             <Label htmlFor="area">Area / Branch <span className="text-red-500">*</span></Label>
             <Select defaultValue={initialData?.area || ""}>
                <SelectTrigger className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alparamba Center">Alparamba Center</SelectItem>
                  <SelectItem value="North Gate">North Gate</SelectItem>
                  <SelectItem value="South Block">South Block</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" placeholder="e.g. Teacher, Business" />
          </div>
        </div>
      </div>

      {/* 2. Membership */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">2. Membership</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="memberId">Member ID</Label>
            <Input id="memberId" defaultValue={initialData?.memberId} placeholder="Auto-generated if empty" disabled={isEdit} />
          </div>
          <div className="space-y-2">
             <Label htmlFor="status">Status</Label>
             <Select defaultValue={initialData?.status || "active"}>
                <SelectTrigger className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <div className="space-y-2">
             <Label htmlFor="tier">Monthly Tier <span className="text-red-500">*</span></Label>
             <Select defaultValue={initialData?.monthlyTier || "flexible"}>
                <SelectTrigger className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexible (₹50/₹100)</SelectItem>
                  <SelectItem value="base">Base (₹50)</SelectItem>
                  <SelectItem value="premium">Premium (₹100)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Monthly Amount (₹) <span className="text-red-500">*</span></Label>
            <Input id="amount" type="number" min="50" defaultValue={initialData?.monthlyAmount || 50} required />
          </div>
        </div>
      </div>

      {/* 3. Blood Donor */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">3. Blood Donor Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 flex items-center gap-2 mt-6">
            <input type="checkbox" id="isDonor" defaultChecked={initialData?.isBloodDonor} className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
            <Label htmlFor="isDonor" className="mb-0 font-normal">Register as Blood Donor</Label>
          </div>
          <div className="space-y-2">
             <Label htmlFor="bloodGroup">Blood Group</Label>
             <Select defaultValue={initialData?.bloodGroup || ""}>
                <SelectTrigger className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
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
        </div>
      </div>
      
      {/* 4. PIN & Access */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">4. App Access & PIN</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300">
               By default, members will be prompted to create a 4-digit PIN when they first log in with their phone number via OTP. 
               Only fill this if you want to manually set a PIN for them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Set 4-Digit PIN (Optional)</Label>
              <Input id="pin" type="text" pattern="[0-9]{4}" placeholder="e.g. 1234" maxLength={4} />
            </div>
            {isEdit && (
               <div className="space-y-2 flex items-center gap-2 mt-6">
                 <input type="checkbox" id="forceReset" className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                 <Label htmlFor="forceReset" className="mb-0 font-normal">Force PIN reset on next login</Label>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 sm:left-64 md:left-72 z-10 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
         <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
         <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
           {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Add Member"}
         </Button>
      </div>

    </form>
  );
}
