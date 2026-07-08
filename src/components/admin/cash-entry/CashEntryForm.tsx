"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Search } from "lucide-react";
import { toast } from "sonner";

export function CashEntryForm() {
  const [category, setCategory] = useState("monthly_dues");
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<{name: string, phone: string, id: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) {
      toast.error("Please select a member first");
      return;
    }
    
    // Simulate successful save
    toast.success("Cash payment recorded successfully");
    
    // Reset form for next entry
    setSelectedMember(null);
    setMemberSearch("");
  };

  const handleSearch = () => {
    if (memberSearch.length > 3) {
      // Mock search result
      setSelectedMember({ name: "Shibili", phone: "9876543210", id: "SSF-101" });
      toast.success("Member found");
    }
  };

  return (
    <Card className="max-w-2xl border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl">Record Payment</CardTitle>
        <CardDescription>
          Enter the details of the cash payment received.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          
          {/* Member Search */}
          <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <Label htmlFor="member-search" className="text-sm font-semibold">Find Member</Label>
            {!selectedMember ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="member-search"
                    placeholder="Search by name or phone number..." 
                    className="pl-9 bg-white dark:bg-slate-900"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                  />
                </div>
                <Button type="button" variant="secondary" onClick={handleSearch}>Search</Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {selectedMember.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{selectedMember.name}</p>
                    <p className="text-xs text-slate-500">{selectedMember.id} • {selectedMember.phone}</p>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-500 hover:text-slate-700"
                  onClick={() => setSelectedMember(null)}
                >
                  Change
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Selection */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="category">Payment Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly_dues">Monthly Dues</SelectItem>
                  <SelectItem value="special_event">Special Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Fields based on Category */}
            {category === "monthly_dues" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tier">Monthly Tier</Label>
                  <Select defaultValue="flexible">
                    <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
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
                  <Label htmlFor="months">Months Covering (e.g. July, Aug)</Label>
                  <Input id="months" placeholder="e.g. July 2026" className="bg-white dark:bg-slate-950" required />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="event">Select Special Event</Label>
                  <Select defaultValue="building_fund">
                    <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                      <SelectValue placeholder="Select Event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="building_fund">Building Construction Fund</SelectItem>
                      <SelectItem value="ramadan_relief">Ramadan Relief Fund</SelectItem>
                      <SelectItem value="education_aid">Education Aid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Amount */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="amount">Amount Received (₹) <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">₹</span>
                <Input id="amount" type="number" min="10" placeholder="0.00" className="pl-8 bg-white dark:bg-slate-950 font-semibold" required />
              </div>
            </div>

            {/* Received By Admin */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="admin">Cash Received By (Admin) <span className="text-red-500">*</span></Label>
              <Select defaultValue="farhan_pres">
                <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select Admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farhan_pres">Farhan (President)</SelectItem>
                  <SelectItem value="shibili_sec">Shibili (Secretary)</SelectItem>
                  <SelectItem value="safwan_treas">Safwan (Treasurer)</SelectItem>
                  <SelectItem value="fawas_col">Fawas (Collector)</SelectItem>
                  <SelectItem value="anshid_col">Anshid (Collector)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input id="notes" placeholder="Any additional information..." className="bg-white dark:bg-slate-950" />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-end border-t border-slate-100 dark:border-slate-800 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900 rounded-b-xl">
          <Button type="button" variant="ghost" className="mr-2">Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2">
            <Check className="size-4" />
            Save Payment Record
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
