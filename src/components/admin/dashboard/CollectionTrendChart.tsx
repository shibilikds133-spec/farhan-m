import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

interface CollectionData {
  month: string;
  amount: number;
}

interface CollectionTrendChartProps {
  data: CollectionData[];
}

export function CollectionTrendChart({ data }: CollectionTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Find max value to scale the chart correctly
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  // Create points for SVG (mapping to viewBox 0 0 1000 300)
  const width = 1000;
  const height = 300;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - (item.amount / maxAmount) * height;
    return { x, y, item };
  });

  // Generate smooth bezier curve path
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    
    const tension = 0.15;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  // Area path (closes the shape at the bottom)
  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Collection Trend</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Past 6 months</p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/20 dark:text-blue-400">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      
      {/* SVG Smooth Area Chart */}
      <div className="flex-1 relative w-full mt-4 flex flex-col">
        <div className="relative w-full flex-1 min-h-[150px]">
          <svg viewBox={`-20 0 ${width + 40} ${height + 10}`} className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            {/* Area */}
            <path
              d={areaPath}
              fill="url(#colorGradient)"
              className="transition-all duration-700 pointer-events-none"
            />
            
            {/* Line */}
            <path
              d={path}
              fill="transparent"
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-700 dark:stroke-blue-400 pointer-events-none"
            />

            {/* Hover Points */}
            {points.map((p, i) => (
              <g key={i} className="transition-opacity duration-200 pointer-events-none">
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="3"
                  className={`transition-all duration-300 ${hoveredIndex === i ? 'scale-150 drop-shadow-md opacity-100' : 'opacity-0'}`}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              </g>
            ))}
          </svg>

          {/* Tooltip HTML Overlay */}
          {hoveredIndex !== null && (
            <div 
              className="absolute pointer-events-none transition-all duration-200 z-20"
              style={{ 
                left: `${(points[hoveredIndex].x / width) * 100}%`, 
                top: `${(points[hoveredIndex].y / height) * 100}%`,
                transform: 'translate(-50%, -150%)'
              }}
            >
              <div className="bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap dark:bg-slate-700">
                ₹{points[hoveredIndex].item.amount.toLocaleString("en-IN")}
              </div>
            </div>
          )}

          {/* Invisible Hover Zones (Very easy to hit on mobile) */}
          <div 
            className="absolute inset-0 flex"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((_, i) => (
              <div 
                key={i} 
                className="flex-1 h-full cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                // Touch events for mobile support
                onTouchStart={() => setHoveredIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="relative w-full h-6 mt-4 border-t border-slate-100 dark:border-slate-700/50 pt-3">
          {data.map((item, index) => {
            const leftPercent = (index / (data.length - 1)) * 100;
            // Adjust translation for first and last items so they don't overflow
            let transform = 'translateX(-50%)';
            if (index === 0) transform = 'translateX(0%)';
            if (index === data.length - 1) transform = 'translateX(-100%)';
            
            return (
              <div 
                key={index} 
                className="absolute text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 cursor-default"
                style={{ left: `${leftPercent}%`, transform }}
              >
                {item.month}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
