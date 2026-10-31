import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { galleryItems, type GalleryItem } from '@/data/studio';

const filters = ['Все', 'Полировка', 'Мойка', 'Защита', 'Автомобили'] as const;
type Filter = (typeof filters)[number];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('Все');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => (filter === 'Все' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section id="gallery" className="scroll-mt-20 border-t border-zinc-900 bg-zinc-900/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Галерея"
              title="Работы нашей студии"
              description="Реальные результаты: от ручной полировки до автомобилей наших клиентов."
            />
            <div role="tablist" aria-label="Фильтр галереи" className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={filter === item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    filter === item
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <Reveal
              key={item.id}
              delay={Math.min(index, 5) * 70}
              className={`h-full ${index === 0 && visibleItems.length > 3 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
            >
              <GalleryTile item={item} onOpen={() => setOpenIndex(index)} featured={index === 0 && visibleItems.length > 3} />
            </Reveal>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={visibleItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}

interface GalleryTileProps {
  item: GalleryItem;
  onOpen: () => void;
  featured: boolean;
}

function GalleryTile({ item, onOpen, featured }: GalleryTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative h-full w-full overflow-hidden rounded-2xl bg-zinc-800 text-left"
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">{item.category}</span>
          <p className={`mt-1 font-bold leading-[1.2] text-white ${featured ? 'text-2xl' : 'text-lg'}`}>{item.title}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500">
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index];
  const total = items.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % total);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, total, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/95 p-4 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <figure className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={item.title} className="max-h-[75vh] w-full rounded-2xl object-contain" />
        <figcaption className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-white">{item.title}</p>
            <p className="text-sm text-zinc-400">
              {item.category} · {index + 1} / {total}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Предыдущее фото"
              onClick={() => onNavigate((index - 1 + total) % total)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 text-white transition-colors hover:border-orange-500 hover:text-orange-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              onClick={() => onNavigate((index + 1) % total)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 text-white transition-colors hover:border-orange-500 hover:text-orange-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white transition-colors hover:bg-orange-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
