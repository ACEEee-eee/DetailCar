import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { heroImage, studioStats } from '@/data/studio';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-24">
      <img
        src={heroImage}
        alt="Чёрный спорткар в студии"
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[70%_center] sm:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
      <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-950/60 px-4 py-1.5 text-sm font-semibold text-orange-300 backdrop-blur">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            Премиальный детейлинг с 2018 года
          </span>

          <h1
            className="animate-fade-up mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '120ms' }}
          >
            Блеск, который <span className="text-orange-500">видно</span> с первого взгляда
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-[1.5] text-zinc-300 sm:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            Мойка, полировка, химчистка и керамическая защита. Работаем на премиальных автомобилях и возвращаем кузову
            заводской вид.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '360ms' }}>
            <a
              href="#booking"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-500 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
            >
              <span className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/20 animate-shine" />
              Записаться на услугу
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-600 bg-zinc-950/40 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-orange-500 hover:text-orange-300"
            >
              Смотреть услуги и цены
            </a>
          </div>

          <dl className="animate-fade-up mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-zinc-800 pt-8" style={{ animationDelay: '480ms' }}>
            {studioStats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 text-xs leading-[1.5] text-zinc-400 sm:text-sm">{stat.label}</dt>
                <dd className="order-1 text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Прокрутить вниз"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-zinc-400 transition-colors hover:text-orange-400 sm:block"
      >
        <ChevronDown className="h-8 w-8 animate-float-soft" />
      </a>
    </section>
  );
}
