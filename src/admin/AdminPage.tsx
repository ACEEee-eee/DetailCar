import { useCallback, useEffect, useMemo, useState } from 'react';
import { Inbox, Loader2, RefreshCw } from 'lucide-react';
import AdminSidebar from '@/admin/AdminSidebar';
import BookingDrawer from '@/admin/BookingDrawer';
import BookingFilters, { type StatusFilter } from '@/admin/BookingFilters';
import BookingStats from '@/admin/BookingStats';
import BookingsTable from '@/admin/BookingsTable';
import { useAdminAuth } from '@/admin/useAdminAuth';
import { fetchBookings, updateBookingStatus, type Booking, type BookingStatus } from '@/lib/bookings';

type LoadState = 'loading' | 'ready' | 'error';

export default function AdminPage() {
  const { email, signOut } = useAdminAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setLoadState('loading');
    try {
      const rows = await fetchBookings();
      setBookings(rows);
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, []);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  const handleStatusChange = useCallback(async (id: string, status: BookingStatus) => {
    await updateBookingStatus(id, status);
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
  }, []);

  const handleCloseDrawer = useCallback(() => setSelectedId(null), []);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      if (statusFilter !== 'all' && booking.status !== statusFilter) return false;
      if (serviceFilter !== 'all' && booking.service_id !== serviceFilter) return false;
      if (!query) return true;
      return [booking.client_name, booking.phone, booking.car].some((value) => value.toLowerCase().includes(query));
    });
  }, [bookings, search, statusFilter, serviceFilter]);

  const selectedBooking = bookings.find((booking) => booking.id === selectedId) ?? null;

  return (
    <div className="min-h-[100svh] bg-zinc-950 text-zinc-100 lg:flex">
      <AdminSidebar email={email} onSignOut={() => void signOut()} />

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Заявки на услуги</h1>
            <p className="mt-2 text-sm text-zinc-400">Заявки с сайта. Нажмите на строку, чтобы открыть подробности.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadBookings()}
            disabled={loadState === 'loading'}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500 hover:text-white disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loadState === 'loading' ? 'animate-spin' : ''}`} />
            Обновить
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {loadState === 'error' && (
            <div role="alert" className="flex flex-col gap-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-red-200">Не удалось загрузить заявки. Проверьте соединение и попробуйте снова.</p>
              <button
                type="button"
                onClick={() => void loadBookings()}
                className="w-fit rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-400"
              >
                Повторить
              </button>
            </div>
          )}

          {loadState === 'loading' && bookings.length === 0 && (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 py-20 text-zinc-400">
              <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
              Загружаем заявки...
            </div>
          )}

          {loadState === 'ready' && bookings.length === 0 && (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400">
                <Inbox className="h-7 w-7" />
              </span>
              <p className="mt-6 text-lg font-bold text-white">Заявок пока нет</p>
              <p className="mt-2 max-w-sm text-sm text-zinc-400">
                Новые заявки появятся здесь сразу после того, как клиент отправит форму записи на сайте.
              </p>
            </div>
          )}

          {(loadState === 'ready' || bookings.length > 0) && (
            <>
              <BookingStats bookings={bookings} />
              {bookings.length > 0 && (
                <>
                  <BookingFilters
                    search={search}
                    onSearchChange={setSearch}
                    status={statusFilter}
                    onStatusChange={setStatusFilter}
                    serviceId={serviceFilter}
                    onServiceChange={setServiceFilter}
                  />
                  <BookingsTable rows={filteredBookings} onSelect={(booking) => setSelectedId(booking.id)} />
                </>
              )}
            </>
          )}
        </div>
      </main>

      {selectedBooking && (
        <BookingDrawer
          key={selectedBooking.id}
          booking={selectedBooking}
          onClose={handleCloseDrawer}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
