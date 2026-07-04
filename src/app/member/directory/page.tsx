"use client";

import { useState } from "react";
import { Search, Phone } from "lucide-react";
import { MemberDetailDrawer, MemberStats } from "@/components/directory/MemberDetailDrawer";
import { Input } from "@/components/ui/input";

// Mock Data
const MOCK_MEMBERS: MemberStats[] = [
  { id: "1", name: "Afsal KK", initials: "AK", phone: "+91 9876543210", targetAmount: 1200, paidPercentage: 100 },
  { id: "2", name: "Favas Rahman", initials: "FR", phone: "+91 9876543211", targetAmount: 1200, paidPercentage: 25 },
  { id: "3", name: "Nabeel", initials: "NA", phone: "+91 9876543212", targetAmount: 1200, paidPercentage: 50 },
  { id: "4", name: "Rashid Ali", initials: "RA", phone: "+91 9876543213", targetAmount: 1200, paidPercentage: 80 },
  { id: "5", name: "Safvan Alparamba", initials: "SA", phone: "+91 9876543214", targetAmount: 1200, paidPercentage: 10 },
  { id: "6", name: "Yahiya", initials: "YA", phone: "+91 9876543215", targetAmount: 1200, paidPercentage: 0 },
];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<MemberStats | null>(null);

  // Filter members based on search query
  const filteredMembers = MOCK_MEMBERS.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.phone.includes(searchQuery)
  );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#F6F8FC] animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Community</h1>
        <p className="text-slate-500 text-sm">Find and connect with other members.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
        <Input 
          type="text" 
          placeholder="Search by name or phone..." 
          className="pl-10 h-12 rounded-xl bg-white border-[#E5EAF3] shadow-sm text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Member List */}
      <div className="bg-white rounded-2xl border border-[#E5EAF3] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E5EAF3]">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                    {member.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 leading-tight">{member.name}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{member.phone}</span>
                  </div>
                </div>

                {/* Call Button (Stops propagation so it doesn't open drawer) */}
                <a 
                  href={`tel:${member.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="size-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors shrink-0"
                >
                  <Phone className="size-4" />
                </a>
              </div>
            ))
          ) : (
            <div className="p-10 text-center flex flex-col items-center">
              <div className="size-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <Search className="size-5 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">No members found</p>
              <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Drawer */}
      <MemberDetailDrawer 
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </div>
  );
}
