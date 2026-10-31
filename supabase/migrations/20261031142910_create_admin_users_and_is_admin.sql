/*
# Create admin_users table and is_admin() check

## Plain-English summary
Defines who is allowed to use the admin panel. An administrator is a Supabase Auth user whose
auth.uid() appears in public.admin_users. Rows are added manually by the studio owner in the
SQL Editor. There is no sign-up path for administrators.

## 1. New tables
- public.admin_users
  - user_id (uuid, primary key) - references auth.users(id), removed automatically if the auth user is deleted
  - created_at (timestamptz) - when the admin was added

## 2. New functions
- public.is_admin() - returns true when the current auth.uid() exists in admin_users.
  Runs with SECURITY DEFINER so policies can check membership without exposing admin_users to the client.

## 3. Security
- RLS enabled on admin_users.
- Signed-in users may read only their own row (so the login screen can confirm admin status).
- No INSERT, UPDATE or DELETE policies or grants: admin rows cannot be changed through the API.
- is_admin() is executable by the authenticated role only (not anon, not PUBLIC).

## 4. Important notes
1. User metadata is never used for authorization.
2. To add an administrator, insert the auth user's UUID in the SQL Editor (see the project notes).
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.admin_users FROM anon, authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

DROP POLICY IF EXISTS "admins_select_own_row" ON public.admin_users;
CREATE POLICY "admins_select_own_row"
ON public.admin_users FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.is_admin()
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

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
