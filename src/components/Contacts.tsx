import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { studioContacts } from '@/data/studio';

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const contactItems: ContactItem[] = [
  { icon: Phone, label: 'Телефон', value: studioContacts.phone, href: studioContacts.phoneHref },
  { icon: Mail, label: 'Электронная почта', value: studioContacts.email, href: `mailto:${studioContacts.email}` },
  { icon: MapPin, label: 'Адрес', value: studioContacts.address },
  { icon: Clock, label: 'Режим работы', value: studioContacts.hours },
];

export default function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-20 border-t border-zinc-900 bg-zinc-900/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Контакты"
            title="Приезжайте в студию"
            description="Покажем работы вживую, обсудим задачу и подберём программу под ваш автомобиль."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {contactItems.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <ContactCard item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/15 via-zinc-900 to-zinc-900 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="text-2xl font-extrabold text-white">Нужна консультация?</p>
              <p className="mt-2 text-zinc-300">Ответим на вопросы по услугам и подскажем, что нужно вашему авто.</p>
            </div>
            <a
              href={studioContacts.phoneHref}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
            >
              <Phone className="h-5 w-5" />
              Позвонить
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({ item }: { item: ContactItem }) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-zinc-500">{item.label}</p>
        <p className="mt-1 text-lg font-bold text-white">{item.value}</p>
      </div>
    </>
  );

  const className =
    'group flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/50';

  return item.href ? (
    <a href={item.href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
