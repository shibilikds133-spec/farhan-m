import { Bell } from "lucide-react";
import Image from "next/image";

export function MemberHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F8FC] border-b border-[#E5EAF3]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm">
            <Image 
              src="/logo/logo.webp" 
              alt="Avatar" 
              fill 
              className="object-cover" 
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium leading-none mb-1">Welcome back,</span>
            <span className="text-sm font-bold text-slate-900 leading-none">Safvan Alparamba</span>
          </div>
        </div>
        <button 
          type="button" 
          className="relative inline-flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Bell className="size-5" />
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-[#F6F8FC]"></span>
        </button>
      </div>
    </header>
  );
}
