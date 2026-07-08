"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export function AdminSearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm dark:bg-slate-950/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl p-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="flex items-center p-2 border-b border-slate-100 dark:border-slate-800">
                <Search className="size-5 ml-3 text-slate-400" />
                <Input 
                  autoFocus
                  placeholder="Search members, receipts, or phone numbers..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-base h-12 shadow-none"
                />
                <button 
                  onClick={onClose}
                  className="p-2 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="p-4 text-center py-12 text-sm text-slate-500">
                Start typing to search across the admin panel...
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
