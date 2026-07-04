"use client";

import { X, Phone, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

export interface MemberStats {
  id: string;
  name: string;
  initials: string;
  phone: string;
  targetAmount: number;
  paidPercentage: number;
}

interface MemberDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberStats | null;
}

export function MemberDetailDrawer({ isOpen, onClose, member }: MemberDetailDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl p-6 pb-safe animate-in slide-in-from-bottom-full duration-300">
        
        {/* Handle bar for visual cue */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />
        
        {/* Close button */}
        <button 
          type="button" 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mt-4 mb-6">
          <div className="size-20 bg-blue-50 text-blue-700 flex items-center justify-center rounded-full text-2xl font-bold border-4 border-white shadow-sm mb-3">
            {member.initials}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{member.name}</h2>
          <p className="text-slate-500 font-medium mt-1">{member.phone}</p>
        </div>

        {/* Stats Panel */}
        <div className="bg-[#F6F8FC] rounded-2xl p-5 border border-[#E5EAF3]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-700">Collection Target</h3>
            <span className="text-sm font-bold text-slate-900">₹{member.targetAmount} / yr</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs text-slate-500 font-medium">Progress</span>
              <span className="text-lg font-black text-[#2563EB]">{member.paidPercentage}%</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              {/* Progress Bar Fill */}
              <div 
                className="h-full bg-[#2563EB] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${member.paidPercentage}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="size-3" /> Information is securely calculated
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 mb-4">
          <a 
            href={`tel:${member.phone}`}
            className="w-full flex items-center justify-center gap-2 h-14 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-sm transition-colors"
          >
            <Phone className="size-5" />
            Call Member
          </a>
        </div>
      </div>
    </div>
  );
}
