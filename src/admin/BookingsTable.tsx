import { CalendarDays, Car, Phone } from 'lucide-react';
import StatusBadge from '@/admin/StatusBadge';
import { formatAppointment, formatCreatedAt } from '@/lib/formatters';
import type { Booking } from '@/lib/bookings';

interface BookingsTableProps {
  rows: Booking[];
  onSelect: (booking: Booking) => void;
}

const headers = ['Клиент', 'Автомобиль', 'Услуга', 'Визит', 'Статус', 'Поступила'];

export default function BookingsTable({ rows, onSelect }: BookingsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-16 text-center">
        <p className="font-semibold text-zinc-200">Ничего не найдено</p>
        <p className="mt-2 text-sm text-zinc-500">Измените поиск или фильтры, чтобы увидеть заявки.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900 text-xs uppercase tracking-[0.12em] text-zinc-500">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-5 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {rows.map((booking) => (
              <tr
                key={booking.id}
                tabIndex={0}
                onClick={() => onSelect(booking)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(booking);
                  }
                }}
                className="cursor-pointer transition-colors duration-200 hover:bg-zinc-800/60 focus:bg-zinc-800/60 focus:outline-none"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-white">{booking.client_name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                    <Phone className="h-3 w-3" />
                    {booking.phone}
                  </p>
                </td>
                <td className="px-5 py-4 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <Car className="h-4 w-4 shrink-0 text-zinc-500" />
                    {booking.car}
                  </span>
                </td>
                <td className="px-5 py-4 text-zinc-300">{booking.service_name}</td>
                <td className="px-5 py-4 text-zinc-300">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <CalendarDays className="h-4 w-4 shrink-0 text-zinc-500" />
                    {formatAppointment(booking.appointment_date, booking.appointment_time)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-zinc-400">{formatCreatedAt(booking.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
