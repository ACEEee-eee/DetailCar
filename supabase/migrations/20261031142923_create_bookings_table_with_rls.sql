/*
# Create bookings table (service appointment requests)

## Plain-English summary
Stores appointment requests submitted through the booking form on the website. Visitors can only
create a request. Only signed-in administrators can read requests and change their status.
Requests cannot be deleted through the API.

## 1. New tables
- public.bookings
  - id (uuid, primary key)
  - created_at (timestamptz) - when the request was submitted
  - client_name (text) - customer name, 2-100 characters
  - phone (text) - contact phone, 10-25 characters
  - car (text) - car make and model, 2-120 characters
  - service_id (text) - identifier of the chosen service
  - service_name (text) - service name at the time of booking
  - appointment_date (date) - requested visit date
  - appointment_time (text) - requested time in HH:MM format
  - comment (text) - optional note, up to 1000 characters
  - status (text) - one of: new, confirmed, completed, cancelled. New requests always start as "new".

## 2. Security
- RLS enabled on bookings.
- anon and authenticated: INSERT only, and only with status = 'new'.
- authenticated admins only (public.is_admin()): SELECT all rows, UPDATE status.
- Column-level UPDATE grant: only the status column can be changed.
- No DELETE grant or policy: requests cannot be removed through the API.

## 3. Performance
- Indexes on created_at (newest first), status and appointment_date for the admin panel filters.

## 4. Important notes
1. Field length and format limits are enforced by the database, not only by the website form.
2. Anonymous visitors cannot read other requests.
*/

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  client_name text NOT NULL CHECK (char_length(client_name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 10 AND 25),
  car text NOT NULL CHECK (char_length(car) BETWEEN 2 AND 120),
  service_id text NOT NULL CHECK (char_length(service_id) BETWEEN 1 AND 60),
  service_name text NOT NULL CHECK (char_length(service_name) BETWEEN 1 AND 200),
  appointment_date date NOT NULL,
  appointment_time text NOT NULL CHECK (appointment_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  comment text NOT NULL DEFAULT '' CHECK (char_length(comment) <= 1000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'completed', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings (status);
CREATE INDEX IF NOT EXISTS bookings_appointment_date_idx ON public.bookings (appointment_date);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT ON public.bookings TO authenticated;
GRANT UPDATE (status) ON public.bookings TO authenticated;

DROP POLICY IF EXISTS "visitors_submit_new_bookings" ON public.bookings;
CREATE POLICY "visitors_submit_new_bookings"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');

DROP POLICY IF EXISTS "admins_read_bookings" ON public.bookings;
CREATE POLICY "admins_read_bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "admins_update_booking_status" ON public.bookings;
CREATE POLICY "admins_update_booking_status"
ON public.bookings FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
