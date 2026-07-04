import { DueStatusCard } from "@/components/dashboard/DueStatusCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";

export default function MemberDashboardPage() {
  // In a real app, this would be fetched from the database
  const mockDueAmount = 100;

  return (
    <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-300">
      <DueStatusCard amountDue={mockDueAmount} />
      <RecentActivityCard />
    </div>
  );
}
