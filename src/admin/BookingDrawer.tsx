import { useEffect, useState, type ReactNode } from 'react';
import { CalendarDays, Car, Loader2, MessageSquare, Phone, Sparkles, X, Clock, type LucideIcon } from 'lucide-react';
import StatusBadge from '@/admin/StatusBadge';
import { bookingStatuses, bookingStatusLabels, type Booking, type BookingStatus } from '@/lib/bookings';
import { formatAppointment, formatCreatedAt } from '@/lib/formatters';

interface BookingDrawerProps {
  booking: Booking;
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => Promise<void>;
}

export default function BookingDrawer({ booking, onClose, onStatusChange }: BookingDrawerProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const changeStatus = async (status: BookingStatus) => {
    if (status === booking.status || saving) return;
    setSaving(true);
    setError('');
    try {
      await onStatusChange(booking.id, status);
    } catch (changeError) {
      setError(changeError instanceof Error ? changeError.message : 'Не удалось изменить статус заявки.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/70 backdrop-blur-sm" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Заявка: ${booking.client_name}`}
        onClick={(event) => event.stopPropagation()}
        className="flex h-full w-full max-w-md animate-fade-up flex-col border-l border-zinc-800 bg-zinc-900 shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-zinc-800 p-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Заявка</p>
            <h2 className="mt-1 truncate text-xl font-extrabold text-white">{booking.client_name}</h2>
            <div className="mt-3">
              <StatusBadge status={booking.status} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 text-zinc-300 transition-colors hover:border-orange-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          <section>
            <SectionTitle>Визит</SectionTitle>
            <DetailRow icon={Sparkles} label="Услуга" value={booking.service_name} />
            <DetailRow
              icon={CalendarDays}
              label="Дата и время"
              value={formatAppointment(booking.appointment_date, booking.appointment_time)}
            />
            <DetailRow icon={Clock} label="Заявка создана" value={formatCreatedAt(booking.created_at)} />
          </section>

          <section>
            <SectionTitle>Клиент</SectionTitle>
            <DetailRow icon={Car} label="Автомобиль" value={booking.car} />
            <DetailRow
              icon={Phone}
              label="Телефон"
              value={
                <a href={`tel:${booking.phone.replace(/[^\d+]/g, '')}`} className="text-orange-300 hover:text-orange-200">
                  {booking.phone}
                </a>
              }
            />
            <DetailRow
              icon={MessageSquare}
              label="Комментарий"
              value={booking.comment || 'Без комментария'}
            />
          </section>

          <section>
            <SectionTitle>Статус</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {bookingStatuses.map((status) => {
                const current = status === booking.status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => void changeStatus(status)}
                    disabled={saving || current}
                    aria-pressed={current}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed ${
                      current
                        ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                        : 'border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-orange-500/60 hover:text-white disabled:opacity-50'
                    }`}
                  >
                    {bookingStatusLabels[status]}
                  </button>
                );
              })}
            </div>
            {saving && (
              <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Сохраняем статус...
              </p>
            )}
            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{children}</h3>;
}

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-4 border-b border-zinc-800/80 py-3 last:border-b-0">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-zinc-100">{value}</p>
      </div>
    </div>
  );
}
