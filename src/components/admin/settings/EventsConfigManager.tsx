"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Edit2, Trash2, Plus, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock Data
interface EventData {
  id: string;
  name: string;
  minimumAmount: number;
  receiptTheme: string;
  isActive: boolean;
  date: string;
}

const INITIAL_EVENTS: EventData[] = [
  { id: "EVT-01", name: "Rabeeyul Awwal Special", minimumAmount: 100, receiptTheme: "amber", isActive: true, date: "Aug 2026" },
  { id: "EVT-02", name: "Ramadan Relief Fund", minimumAmount: 200, receiptTheme: "default", isActive: false, date: "Mar 2026" },
];

export function EventsConfigManager() {
  const [events, setEvents] = useState<EventData[]>(INITIAL_EVENTS);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Assuming current user is a super admin for this demo
  const isCurrentUserSuperAdmin = true;

  const handleSave = (e: React.FormEvent, id: string | null) => {
    e.preventDefault();
    if (id) {
      toast.success("Event updated successfully");
      setEditingId(null);
    } else {
      toast.success("New event created successfully");
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    toast.error("Event deleted");
  };

  const renderForm = (event?: EventData) => (
    <form onSubmit={(e) => handleSave(e, event?.id || null)} className="space-y-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Event Name</Label>
          <Input name="name" defaultValue={event?.name} className="bg-white dark:bg-slate-950" required />
        </div>
        <div className="space-y-2">
          <Label>Minimum Amount (₹)</Label>
          <Input name="amount" type="number" defaultValue={event?.minimumAmount || 50} className="bg-white dark:bg-slate-950 font-mono" required />
        </div>
        <div className="space-y-2">
          <Label>Receipt Theme</Label>
          <Select name="theme" defaultValue={event?.receiptTheme || "default"}>
            <SelectTrigger className="bg-white dark:bg-slate-950">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Blue</SelectItem>
              <SelectItem value="amber">Amber/Gold (Ceremonial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={event?.isActive !== false ? "active" : "inactive"}>
            <SelectTrigger className="bg-white dark:bg-slate-950">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active (Visible to users)</SelectItem>
              <SelectItem value="inactive">Inactive (Hidden)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }}>Cancel</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Event</Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create New Event
        </Button>
      )}

      {isAdding && renderForm()}

      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="p-4 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 transition-colors">
            {editingId === event.id ? (
              renderForm(event)
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">{event.name}</h3>
                    {event.isActive ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 shadow-none">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-500 dark:bg-slate-800 shadow-none">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="font-medium font-mono text-slate-700 dark:text-slate-300">Min: ₹{event.minimumAmount}</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {event.date}</span>
                    {event.receiptTheme === 'amber' && (
                      <span className="text-amber-600 dark:text-amber-400 font-medium">Amber Theme</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0 dark:border-slate-800">
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(event.id)} className="flex-1 sm:flex-none text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-blue-900/20">
                    <Edit2 className="size-4 mr-2 sm:mr-0" />
                    <span className="sm:hidden">Edit</span>
                  </Button>
                  {isCurrentUserSuperAdmin && (
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} className="flex-1 sm:flex-none text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-900/20">
                      <Trash2 className="size-4 mr-2 sm:mr-0" />
                      <span className="sm:hidden">Delete</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
