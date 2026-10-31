/*
# Restrict default table privileges on bookings

## Plain-English summary
Supabase grants full table access (read, insert, update, delete) to the public and signed-in roles
on new tables by default. This migration removes those broad grants from the bookings table and
re-applies only the minimum the website needs.

## 1. Modified tables
- public.bookings - privileges reset, then granted again as follows.

## 2. Security changes
- anon: INSERT only (to submit a request). Cannot read, change or delete requests.
- authenticated: INSERT, SELECT (for admins via RLS), and UPDATE on the status column only.
- DELETE is not granted to any role.

## 3. Important notes
1. Row access is still controlled by the RLS policies on bookings.
*/

REVOKE ALL ON public.bookings FROM anon, authenticated;

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT ON public.bookings TO authenticated;
GRANT UPDATE (status) ON public.bookings TO authenticated;
