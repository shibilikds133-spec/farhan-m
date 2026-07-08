import React from "react";
import { PieChart } from "lucide-react";

interface PaymentMethod {
  method: string;
  percentage: number;
  color: string;
}

interface PaymentMethodChartProps {
  data: PaymentMethod[];
}

export function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Payment Split</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">By channel</p>
        </div>
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-900/20 dark:text-emerald-400">
          <PieChart className="w-5 h-5" />
        </div>
      </div>
      
      {/* Horizontal Stacked Bar representing the split */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full h-4 rounded-full overflow-hidden flex mb-6">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`h-full ${item.color} transition-all duration-500`} 
              style={{ width: `${item.percentage}%` }}
              title={`${item.method}: ${item.percentage}%`}
            ></div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="space-y-3 mt-auto">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${item.color}`}></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.method}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
