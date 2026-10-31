import { Car, Phone } from 'lucide-react';
import { studioContacts } from '@/data/studio';

const footerLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#about', label: 'О компании' },
  { href: '#booking', label: 'Запись' },
  { href: '#contacts', label: 'Контакты' },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex items-center gap-2.5 w-fit">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Car className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Detail<span className="text-orange-400">Pro</span>
            </span>
          </a>
          <p className="max-w-xs text-sm leading-[1.5] text-zinc-400">
            Детейлинг-студия полного цикла. Аккуратная работа, прозрачные цены и гарантия на каждую услугу.
          </p>
        </div>

        <nav aria-label="Разделы сайта">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Навигация</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-zinc-300 transition-colors hover:text-orange-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Связь</p>
          <a
            href={studioContacts.phoneHref}
            className="mt-4 inline-flex items-center gap-2 text-lg font-bold text-white transition-colors hover:text-orange-400"
          >
            <Phone className="h-4 w-4 text-orange-400" />
            {studioContacts.phone}
          </a>
          <p className="mt-2 text-sm text-zinc-400">{studioContacts.address}</p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} DetailPro. Все права защищены.</p>
          <p>Демонстрационный сайт</p>
        </div>
      </div>
    </footer>
  );
}
