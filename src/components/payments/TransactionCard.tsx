import { Download, Banknote, SmartphoneNfc, FileText } from "lucide-react";
import Link from "next/link";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: "UPI" | "CASH";
  status: "COMPLETED" | "PENDING" | "FAILED";
  receiptUrl?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF3] p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Icon based on method */}
        <div className={`size-12 flex items-center justify-center rounded-full shrink-0 ${
          transaction.method === "UPI" ? "bg-purple-50 text-purple-600" : "bg-emerald-50 text-emerald-600"
        }`}>
          {transaction.method === "UPI" ? <SmartphoneNfc className="size-6" /> : <Banknote className="size-6" />}
        </div>
        
        {/* Details */}
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 text-lg">₹{transaction.amount}</span>
          <span className="text-xs text-slate-500 font-medium">
            {transaction.date} • {transaction.method === "UPI" ? "Online Transfer" : "Handover"}
          </span>
          {/* Status Badge (if not completed) */}
          {transaction.status !== "COMPLETED" && (
            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 w-max px-2 py-0.5 rounded-full ${
              transaction.status === "PENDING" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
            }`}>
              {transaction.status}
            </span>
          )}
        </div>
      </div>

      {/* Action: View Receipt */}
      {transaction.status === "COMPLETED" && transaction.receiptUrl && (
        <Link 
          href={transaction.receiptUrl}
          className="flex flex-col items-center justify-center p-2 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-xl transition-colors"
        >
          <FileText className="size-6 mb-0.5" />
          <span className="text-[10px] font-bold">Receipt</span>
        </Link>
      )}
    </div>
  );
}
