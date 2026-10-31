import { Navigate, Link } from 'react-router-dom';
import { Car, LogOut, ShieldAlert } from 'lucide-react';
import AdminLoader from '@/admin/AdminLoader';
import { useAdminAuth } from '@/admin/useAdminAuth';
import type { ReactNode } from 'react';

interface RequireAdminProps {
  children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { status, signOut } = useAdminAuth();

  if (status === 'loading') return <AdminLoader />;
  if (status === 'signed-out') return <Navigate to="/admin/login" replace />;

  if (status !== 'admin') {
    const isError = status === 'error';
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 text-center shadow-2xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
            <ShieldAlert className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-2xl font-extrabold text-white">Доступ закрыт</h1>
          <p className="mt-3 text-zinc-400">
            {isError
              ? 'Не удалось проверить права доступа. Попробуйте войти позже.'
              : 'Этот аккаунт не имеет доступа к панели управления. Войдите под учётной записью администратора.'}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
            >
              <LogOut className="h-4 w-4" />
              Выйти из аккаунта
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500 hover:text-white"
            >
              <Car className="h-4 w-4" />
              На сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
