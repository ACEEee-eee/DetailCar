import { bookingStatusLabels, type BookingStatus } from '@/lib/bookings';

const badgeStyles: Record<BookingStatus, string> = {
  new: 'border-orange-500/40 bg-orange-500/15 text-orange-300',
  confirmed: 'border-sky-500/40 bg-sky-500/15 text-sky-300',
  completed: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
  cancelled: 'border-red-500/40 bg-red-500/15 text-red-300',
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}>
      {bookingStatusLabels[status]}
    </span>
  );
}
