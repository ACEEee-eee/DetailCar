import { Link } from 'react-router-dom';
import { Car, Globe, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  email: string;
  onSignOut: () => void;
}

export default function AdminSidebar({ email, onSignOut }: AdminSidebarProps) {
  return (
    <aside className="border-b border-zinc-800 bg-zinc-900/70 px-4 py-4 sm:px-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="flex items-center justify-between gap-4 lg:block">
        <Link to="/admin" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Car className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span>
            <span className="block text-xl font-extrabold leading-none tracking-tight text-white">
              Detail<span className="text-orange-400">Pro</span>
            </span>
            <span className="mt-1 block text-xs text-zinc-500">Панель администратора</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500 hover:text-white lg:hidden"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </button>
      </div>

      <nav aria-label="Разделы панели" className="mt-6 flex gap-2 lg:flex-col">
        <span
          aria-current="page"
          className="flex items-center gap-3 rounded-xl bg-orange-500/15 px-4 py-3 text-sm font-semibold text-orange-300"
        >
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Заявки
        </span>
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <Globe className="h-4 w-4" />
          Сайт
        </Link>
      </nav>

      <div className="mt-auto hidden flex-col gap-4 border-t border-zinc-800 pt-6 lg:flex">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Вы вошли как</p>
          <p className="mt-1 truncate text-sm font-semibold text-zinc-200">{email}</p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-red-500/60 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
}
