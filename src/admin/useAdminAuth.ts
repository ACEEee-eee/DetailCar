import { createContext, useContext } from 'react';

export type AdminAccessStatus = 'loading' | 'signed-out' | 'forbidden' | 'admin' | 'error';

export interface AdminAuthValue {
  status: AdminAccessStatus;
  email: string;
  signOut: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return value;
}
