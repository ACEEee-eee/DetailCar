import { useMemo, useState } from 'react';
import { Check, Clock } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { serviceCategories, services, type Service, type ServiceCategory } from '@/data/studio';

type Filter = 'Все' | ServiceCategory;

const filters: Filter[] = ['Все', ...(Object.keys(serviceCategories) as ServiceCategory[])];

function formatPrice(price: number, priceFrom: boolean) {
  const formatted = `${price.toLocaleString('ru-RU')} ₽`;
  return priceFrom ? `от ${formatted}` : formatted;
}

interface ServicesProps {
  onBook: (serviceId: string) => void;
}

export default function Services({ onBook }: ServicesProps) {
  const [filter, setFilter] = useState<Filter>('Все');

  const visibleServices = useMemo(
    () => (filter === 'Все' ? services : services.filter((service) => service.category === filter)),
    [filter],
  );

  return (
    <section id="services" className="scroll-mt-20 bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Каталог услуг"
            title="Услуги и цены"
            description="Прозрачная стоимость без скрытых платежей. Точную цену назовём после осмотра автомобиля."
          />
        </Reveal>

        <Reveal delay={100}>
          <div role="tablist" aria-label="Категории услуг" className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  filter === item
                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-orange-500/60 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((service, index) => (
            <Reveal key={service.id} delay={Math.min(index, 5) * 60}>
              <ServiceCard service={service} onBook={onBook} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

function ServiceCard({ service, onBook }: ServiceCardProps) {
  const Icon = serviceCategories[service.category];

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-orange-500/10 sm:p-8">
      {service.popular && (
        <span className="absolute right-6 top-6 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">
          Хит студии
        </span>
      )}

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800 text-orange-400 transition-colors duration-500 group-hover:bg-orange-500 group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{service.category}</p>
      <h3 className="mt-2 text-xl font-bold leading-[1.2] text-white">{service.name}</h3>
      <p className="mt-3 text-sm leading-[1.5] text-zinc-400">{service.description}</p>

      <ul className="mb-8 mt-6 space-y-2.5">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-zinc-800 pt-6">
        <div>
          <p className="text-2xl font-extrabold text-white">{formatPrice(service.price, service.priceFrom)}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="h-3.5 w-3.5" />
            Длительность: {service.duration}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onBook(service.id)}
          className="shrink-0 rounded-xl border border-orange-500/60 px-4 py-2.5 text-sm font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
        >
          Записаться
        </button>
      </div>
    </article>
  );
}
