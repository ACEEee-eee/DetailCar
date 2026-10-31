import { supabase } from '@/lib/supabase';

export const bookingStatuses = ['new', 'confirmed', 'completed', 'cancelled'] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const bookingStatusLabels: Record<BookingStatus, string> = {
  new: 'Новая',
  confirmed: 'Подтверждена',
  completed: 'Завершена',
  cancelled: 'Отменена',
};

export interface Booking {
  id: string;
  created_at: string;
  client_name: string;
  phone: string;
  car: string;
  service_id: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  comment: string;
  status: BookingStatus;
}

export type NewBooking = Pick<
  Booking,
  'client_name' | 'phone' | 'car' | 'service_id' | 'service_name' | 'appointment_date' | 'appointment_time' | 'comment'
>;

const bookingColumns =
  'id, created_at, client_name, phone, car, service_id, service_name, appointment_date, appointment_time, comment, status';

export async function submitBooking(booking: NewBooking): Promise<void> {
  const { error } = await supabase.from('bookings').insert({ ...booking, status: 'new' });
  if (error) {
    console.error('Booking submit failed:', error);
    throw new Error('Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.');
  }
}

export async function fetchBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(bookingColumns)
    .order('created_at', { ascending: false });
  if (error || !data) {
    console.error('Booking fetch failed:', error);
    throw new Error('Не удалось загрузить заявки.');
  }
  return data as Booking[];
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select('id')
    .maybeSingle();
  if (error || !data) {
    console.error('Booking status update failed:', error);
    throw new Error('Не удалось изменить статус заявки.');
  }
}
