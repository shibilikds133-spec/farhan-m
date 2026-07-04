import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DueStatusCardProps {
  amountDue: number;
}

export function DueStatusCard({ amountDue }: DueStatusCardProps) {
  const isClear = amountDue === 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 mb-1">
            {isClear ? "Status" : "Outstanding Dues"}
          </h2>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${isClear ? 'text-green-600' : 'text-slate-900'}`}>
              {isClear ? "All Clear" : `₹${amountDue}`}
            </span>
          </div>
        </div>
        
        <div className={`p-2 rounded-full ${isClear ? 'bg-green-50' : 'bg-red-50'}`}>
          {isClear ? (
            <CheckCircle2 className="size-6 text-green-600" />
          ) : (
            <AlertCircle className="size-6 text-red-500" />
          )}
        </div>
      </div>

      {!isClear && (
        <div className="mt-5">
          <Link href="/pay" className="block w-full">
            <Button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-sm transition-all flex items-center justify-center gap-2">
              Pay Now <ChevronRight className="size-4" />
            </Button>
          </Link>
          <p className="text-center text-xs text-slate-400 mt-3 font-medium">
            Clear your dues before the end of this month
          </p>
        </div>
      )}
    </div>
  );
}
