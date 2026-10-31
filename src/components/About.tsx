import { Award, Users } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { aboutImage, studioStats, studioValues } from '@/data/studio';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4]">
                <img
                  src={aboutImage}
                  alt="Мастер полирует кузов автомобиля в боксе студии"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 right-4 flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur sm:right-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-white">Топ-3</p>
                  <p className="text-sm text-zinc-400">детейлинг-студий города</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="О компании"
                title="Мы любим автомобили так же, как вы"
                description="DetailPro - команда мастеров, которые превращают обычную машину в предмет гордости. Работаем аккуратно, делаем всё по технологии и не обещаем того, чего нельзя сделать."
              />
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-3 gap-4 border-y border-zinc-800 py-6">
                {studioStats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="text-2xl font-extrabold text-orange-400 sm:text-3xl">{stat.value}</dd>
                    <dt className="mt-1 text-xs leading-[1.5] text-zinc-400 sm:text-sm">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {studioValues.map((value, index) => (
                <Reveal key={value.title} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors duration-300 hover:border-orange-500/40">
                    <p className="font-bold text-white">{value.title}</p>
                    <p className="mt-2 text-sm leading-[1.5] text-zinc-400">{value.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <p className="flex items-center gap-3 text-sm text-zinc-400">
                <Users className="h-5 w-5 text-orange-400" />
                В команде 9 мастеров с опытом работы от 5 лет
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
