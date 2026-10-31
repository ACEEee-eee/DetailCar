/*
# Move admin check function out of the public API schema

## Plain-English summary
The admin check function was reachable through the public API. It only returns true or false for the
caller, but it does not need to be callable from the outside. This migration moves it into a private
schema that the API does not expose and recreates the bookings policies to use it.

## 1. New objects
- private schema
- private.is_admin() - same logic as before: true when auth.uid() is listed in admin_users.

## 2. Removed objects
- public.is_admin() - removed from the public schema.

## 3. Modified policies (bookings)
- admins_read_bookings and admins_update_booking_status now call private.is_admin().

## 4. Security
- private schema: usage granted to authenticated only.
- private.is_admin(): executable by authenticated only (not anon, not PUBLIC).
- Function uses SECURITY DEFINER with an empty search_path and fully qualified names.

## 5. Important notes
1. Admin rows are still managed only in the SQL Editor.
*/

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
  );
$$;

REVOKE EXECUTE ON FUNCTION private.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated;

DROP POLICY IF EXISTS "admins_read_bookings" ON public.bookings;
CREATE POLICY "admins_read_bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (private.is_admin());

DROP POLICY IF EXISTS "admins_update_booking_status" ON public.bookings;
CREATE POLICY "admins_update_booking_status"
ON public.bookings FOR UPDATE
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP FUNCTION IF EXISTS public.is_admin();
