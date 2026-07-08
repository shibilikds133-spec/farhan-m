import React from "react";
import { TrendingUp } from "lucide-react";

interface CollectionData {
  month: string;
  amount: number;
}

interface CollectionTrendChartProps {
  data: CollectionData[];
}

export function CollectionTrendChart({ data }: CollectionTrendChartProps) {
  // Find max value to scale the bars correctly
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Collection Trend</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Past 6 months</p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/20 dark:text-blue-400">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      
      {/* Simple Bar Chart Implementation */}
      <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 mt-8">
        {data.map((item, index) => {
          const heightPercent = Math.max((item.amount / maxAmount) * 100, 5); // Ensure minimum height
          
          return (
            <div key={index} className="flex flex-col items-center flex-1 group">
              <div className="relative w-full flex justify-center h-full items-end group-hover:opacity-80 transition-opacity">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none transition-opacity dark:bg-slate-700">
                  ₹{item.amount.toLocaleString("en-IN")}
                </div>
                
                {/* Bar */}
                <div 
                  className="w-full max-w-[2rem] bg-blue-600 rounded-t-sm dark:bg-blue-500 transition-all duration-500" 
                  style={{ height: `${heightPercent}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
