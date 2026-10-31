import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Car, Loader2, ShieldAlert } from 'lucide-react';
import AdminLoader from '@/admin/AdminLoader';
import { useAdminAuth } from '@/admin/useAdminAuth';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30';

export default function AdminLoginPage() {
  const { status } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (status === 'loading') return <AdminLoader />;
  if (status === 'admin') return <Navigate to="/admin" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Введите email и пароль');
      return;
    }

    setSubmitting(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'Неверный email или пароль'
          : 'Не удалось войти. Попробуйте ещё раз позже.',
      );
      return;
    }
    setPassword('');
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-orange-500/10 to-transparent" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Car className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Detail<span className="text-orange-400">Pro</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl shadow-black/40 backdrop-blur sm:p-10">
          <h1 className="text-2xl font-extrabold text-white">Вход для администратора</h1>
          <p className="mt-2 text-sm text-zinc-400">Панель управления заявками доступна только сотрудникам студии.</p>

          {status === 'forbidden' && (
            <p role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              Текущий аккаунт не имеет доступа к панели. Войдите под учётной записью администратора.
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-email" className="text-sm font-semibold text-zinc-200">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-password" className="text-sm font-semibold text-zinc-200">
                Пароль
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {submitting ? 'Входим...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
