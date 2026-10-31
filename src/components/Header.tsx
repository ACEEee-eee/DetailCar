import { useEffect, useState } from 'react';
import { Car, Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const navItems = [
  { id: 'services', label: 'Услуги' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'about', label: 'О компании' },
  { id: 'contacts', label: 'Контакты' },
];

const sectionIds = [...navItems.map((item) => item.id), 'booking'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-zinc-800/80 bg-zinc-950/90 py-3 shadow-lg shadow-black/30 backdrop-blur-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" onClick={closeMenu} className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-transform duration-300 group-hover:-rotate-6">
            <Car className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Detail<span className="text-orange-400">Pro</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                activeId === item.id ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-orange-500 transition-transform duration-300 ${
                  activeId === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#booking"
            className="hidden rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 sm:inline-flex"
          >
            Записаться
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-white transition-colors hover:border-orange-500 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-4 mt-4 flex flex-col gap-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 sm:mx-6" aria-label="Мобильная навигация">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                activeId === item.id ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={closeMenu}
            className="mt-2 rounded-xl bg-orange-500 px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-orange-400"
          >
            Записаться
          </a>
        </nav>
      </div>
    </header>
  );
}
