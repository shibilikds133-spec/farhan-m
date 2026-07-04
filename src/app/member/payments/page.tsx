import { ShieldCheck, CalendarRange } from "lucide-react";
import { TransactionCard, Transaction } from "@/components/payments/TransactionCard";

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    date: "July 2, 2026",
    amount: 100,
    method: "UPI",
    status: "COMPLETED",
    receiptUrl: "/receipt/tx_1?method=UPI&admin=Admin&phone=Member"
  },
  {
    id: "tx_2",
    date: "June 1, 2026",
    amount: 100,
    method: "CASH",
    status: "COMPLETED",
    receiptUrl: "/receipt/tx_2?method=CASH&admin=Farhan%20(President)&phone=Member"
  },
  {
    id: "tx_3",
    date: "May 5, 2026",
    amount: 150,
    method: "UPI",
    status: "COMPLETED",
    receiptUrl: "/receipt/tx_3?method=UPI&admin=Admin&phone=Member"
  },
];

export default function PaymentsPage() {
  const totalPaid = MOCK_TRANSACTIONS.reduce((sum, tx) => sum + (tx.status === "COMPLETED" ? tx.amount : 0), 0);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#F6F8FC] animate-in fade-in duration-300 pb-24 md:pb-6">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payments History</h1>
        <p className="text-slate-500 text-sm">View your past transactions and receipts.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <ShieldCheck className="size-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Active Member</span>
            </div>
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              <CalendarRange className="size-5" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-blue-100 font-medium mb-1">Total Amount Paid</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">₹{totalPaid}</span>
              <span className="text-blue-200 text-sm font-medium">this year</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Recent Transactions
          <span className="bg-slate-200 text-slate-600 text-xs py-0.5 px-2 rounded-full">{MOCK_TRANSACTIONS.length}</span>
        </h2>
        
        <div className="flex flex-col gap-3">
          {MOCK_TRANSACTIONS.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>

    </div>
  );
}
