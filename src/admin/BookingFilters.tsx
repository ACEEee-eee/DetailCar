import { Search } from 'lucide-react';
import { services } from '@/data/studio';
import { bookingStatuses, bookingStatusLabels, type BookingStatus } from '@/lib/bookings';

export type StatusFilter = BookingStatus | 'all';

interface BookingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  serviceId: string;
  onServiceChange: (value: string) => void;
}

export default function BookingFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  serviceId,
  onServiceChange,
}: BookingFiltersProps) {
  const statusOptions: StatusFilter[] = ['all', ...bookingStatuses];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative flex w-full items-center lg:max-w-sm">
          <span className="sr-only">Поиск по заявкам</span>
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-zinc-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Имя, телефон, автомобиль"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 transition-colors duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
        </label>

        <label className="flex items-center gap-3 text-sm text-zinc-400">
          <span className="shrink-0">Услуга</span>
          <select
            value={serviceId}
            onChange={(event) => onServiceChange(event.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white transition-colors focus:border-orange-500 focus:outline-none lg:w-64"
          >
            <option value="all">Все услуги</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div role="tablist" aria-label="Фильтр по статусу" className="flex flex-wrap gap-2">
        {statusOptions.map((option) => {
          const label = option === 'all' ? 'Все статусы' : bookingStatusLabels[option];
          const active = status === option;
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatusChange(option)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
