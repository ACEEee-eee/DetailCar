import { Activity, CalendarCheck, CheckCircle2, ClipboardList, type LucideIcon } from 'lucide-react';
import { bookingStatusLabels, type Booking } from '@/lib/bookings';

interface BookingStatsProps {
  bookings: Booking[];
}

export default function BookingStats({ bookings }: BookingStatsProps) {
  const countWithStatus = (status: Booking['status']) => bookings.filter((booking) => booking.status === status).length;

  const items: { label: string; value: number; icon: LucideIcon; accent: string }[] = [
    { label: 'Всего заявок', value: bookings.length, icon: ClipboardList, accent: 'text-zinc-300 bg-zinc-800' },
    { label: bookingStatusLabels.new, value: countWithStatus('new'), icon: Activity, accent: 'text-orange-300 bg-orange-500/15' },
    { label: bookingStatusLabels.confirmed, value: countWithStatus('confirmed'), icon: CalendarCheck, accent: 'text-sky-300 bg-sky-500/15' },
    { label: bookingStatusLabels.completed, value: countWithStatus('completed'), icon: CheckCircle2, accent: 'text-emerald-300 bg-emerald-500/15' },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors duration-300 hover:border-zinc-700"
        >
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-zinc-400">{item.label}</dt>
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.accent}`}>
              <item.icon className="h-4 w-4" />
            </span>
          </div>
          <dd className="mt-3 text-3xl font-extrabold text-white">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
