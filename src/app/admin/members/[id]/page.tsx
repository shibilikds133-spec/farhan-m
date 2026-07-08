"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Key, Banknote, Phone, Clock, Copy, X, ExternalLink } from "lucide-react";
import { MOCK_MEMBERS } from "@/lib/admin/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemberDetailTabs } from "@/components/admin/members/MemberDetailTabs";
import Link from "next/link";

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGeneratePin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPin(newPin);
    setIsCopied(false);
    setIsPinModalOpen(true);
  };

  const handleCopy = () => {
    if (generatedPin) {
      navigator.clipboard.writeText(generatedPin);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (!member || !generatedPin) return;
    const message = `Hello ${member.name}, your SSF Alparamba account is ready. Your login PIN is: *${generatedPin}*. Please login at our website.`;
    const whatsappUrl = `https://wa.me/91${member.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const member = MOCK_MEMBERS.find((m) => m.id === params.id);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Member Not Found</h2>
        <p className="text-slate-500 mb-6">The member record you are looking for does not exist or has been deleted.</p>
        <Button onClick={() => router.push("/admin/members")}>Back to Directory</Button>
      </div>
    );
  }

  const isDefaulter = member.status === "inactive" || member.pinStatus === "reset_required";

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      
      {/* Top Navigation */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => router.push("/admin/members")}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Back to Directory</div>
      </div>

      {/* Member Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
           <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl text-slate-600 dark:text-slate-300 font-bold shrink-0">
                {member.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                 <div className="flex flex-wrap items-center gap-2 mb-1">
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{member.name}</h2>
                   <Badge variant={member.status === "active" ? "success" : "secondary"} className="ml-2">
                     {member.status}
                   </Badge>
                   {isDefaulter && (
                     <Badge variant="destructive" className="flex items-center">
                       <Clock className="w-3 h-3 mr-1" /> Overdue
                     </Badge>
                   )}
                 </div>
                 <div className="text-slate-500 dark:text-slate-400 font-mono mb-2">{member.memberId}</div>
                 
                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4">
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <Phone className="w-4 h-4 mr-2 text-slate-400" />
                      <span className="font-mono">{member.phone}</span>
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">₹</div>
                      <span>{member.monthlyAmount} / {member.monthlyTier}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="grid grid-cols-2 md:flex items-center gap-2 w-full md:w-auto mt-6 md:mt-0">
              <Link href={`/admin/members/${member.id}/edit`} className="w-full md:w-auto">
                <Button variant="outline" className="w-full h-10 border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              </Link>
              <Button onClick={handleGeneratePin} variant="outline" className="w-full h-10 border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                <Key className="w-4 h-4 mr-2" /> Reset PIN
              </Button>
              <Button className="col-span-2 md:col-auto w-full h-10 bg-blue-600 hover:bg-blue-700 text-white">
                <Banknote className="w-4 h-4 mr-2" /> Record Cash
              </Button>
           </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <MemberDetailTabs member={member} />

      {/* PIN Reset Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center">
                <Key className="w-4 h-4 mr-2 text-blue-600" />
                Generated PIN
              </h3>
              <button onClick={() => setIsPinModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 text-center space-y-4">
              <p className="text-sm text-slate-500">
                Share this 4-digit PIN with <strong>{member.name}</strong> to allow them to login.
              </p>
              
              <div className="text-5xl font-mono font-bold tracking-widest text-slate-900 dark:text-slate-50 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                {generatedPin}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button onClick={handleCopy} variant="outline" className="w-full h-12 bg-white dark:bg-slate-900">
                  <Copy className="w-4 h-4 mr-2 text-slate-500" />
                  {isCopied ? "Copied!" : "Copy PIN"}
                </Button>
                
                <Button onClick={handleWhatsApp} className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
