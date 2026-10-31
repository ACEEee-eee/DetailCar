import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AdminAuthContext, type AdminAccessStatus } from '@/admin/useAdminAuth';
import { supabase } from '@/lib/supabase';

export default function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AdminAccessStatus>('loading');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let latestRequest = 0;

    const resolveAccess = async (session: Session | null) => {
      const requestId = ++latestRequest;

      if (!session) {
        setEmail('');
        setStatus('signed-out');
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (requestId !== latestRequest) return;

      if (error) {
        console.error('Admin check failed:', error);
        setEmail(session.user.email ?? '');
        setStatus('error');
        return;
      }

      setEmail(session.user.email ?? '');
      setStatus(data ? 'admin' : 'forbidden');
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        await resolveAccess(session);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return <AdminAuthContext.Provider value={{ status, email, signOut }}>{children}</AdminAuthContext.Provider>;
}
