import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_SPECIAL_EVENTS } from "@/lib/admin/mock-data";
import { EventCard } from "@/components/admin/events/EventCard";

export default function AdminEventsPage() {
  const events = MOCK_SPECIAL_EVENTS;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10 max-w-3xl">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight dark:text-slate-50">Special Events</h2>
        <p className="text-slate-500 mt-1 dark:text-slate-400">
          Create, edit, and manage active donation campaigns.
        </p>
      </div>
      
      {/* Action */}
      <div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-10 px-4">
          <Plus className="w-4 h-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map(event => (
          <EventCard key={event.id} event={event as any} />
        ))}
      </div>
      
    </div>
  );
}
