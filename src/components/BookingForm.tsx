import { useState, type FormEvent, type ReactNode } from 'react';
import { CalendarCheck, CheckCircle2, Clock, Phone, Shield, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { bookingTimeSlots, services, studioContacts } from '@/data/studio';

interface BookingFormState {
  name: string;
  phone: string;
  car: string;
  date: string;
  time: string;
  comment: string;
}

type FormErrors = Partial<Record<keyof BookingFormState | 'serviceId', string>>;

const emptyForm: BookingFormState = { name: '', phone: '', car: '', date: '', time: '', comment: '' };

const inputClass =
  'w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-white placeholder:text-zinc-500 transition-colors duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30';

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function validate(form: BookingFormState, serviceId: string): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2) errors.name = 'Укажите имя';
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Введите номер телефона полностью';
  if (form.car.trim().length < 2) errors.car = 'Укажите марку и модель автомобиля';
  if (!services.some((service) => service.id === serviceId)) errors.serviceId = 'Выберите услугу';
  if (!form.date) errors.date = 'Выберите дату';
  if (!form.time) errors.time = 'Выберите время';
  return errors;
}

interface BookingFormProps {
  serviceId: string;
  onServiceChange: (serviceId: string) => void;
}

export default function BookingForm({ serviceId, onServiceChange }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const selectedService = services.find((service) => service.id === serviceId);

  const updateField = <K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form, serviceId);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('success');
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="booking" className="scroll-mt-20 bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="Онлайн-запись"
              title="Запишитесь на удобное время"
              description="Заполните форму, и мы подтвердим визит по телефону в течение 15 минут в рабочее время."
            />
            <ul className="space-y-5">
              <BenefitItem icon={CalendarCheck} title="Свободный график" text="Записываем на любой день недели, включая выходные." />
              <BenefitItem icon={Clock} title="Точное время" text="Каждый автомобиль обслуживает один мастер, без очередей." />
              <BenefitItem icon={Shield} title="Гарантия на работы" text="Письменная гарантия на полировку и керамику." />
            </ul>
            <a
              href={studioContacts.phoneHref}
              className="inline-flex w-fit items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500 hover:text-white"
            >
              <Phone className="h-4 w-4 text-orange-400" />
              Или позвоните: {studioContacts.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/40 sm:p-10">
            {status === 'success' ? (
              <SuccessState
                name={form.name}
                serviceName={selectedService?.name ?? ''}
                date={form.date}
                time={form.time}
                onReset={resetForm}
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Ваше имя" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="Иван Петров"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Телефон" error={errors.phone}>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Автомобиль" error={errors.car}>
                  <input
                    type="text"
                    value={form.car}
                    onChange={(event) => updateField('car', event.target.value)}
                    placeholder="Например, Kia Sportage, белый"
                    className={inputClass}
                  />
                </Field>

                <Field label="Услуга" error={errors.serviceId}>
                  <select
                    value={serviceId}
                    onChange={(event) => {
                      onServiceChange(event.target.value);
                      setErrors((prev) => ({ ...prev, serviceId: undefined }));
                    }}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.price.toLocaleString('ru-RU')} ₽
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Дата" error={errors.date}>
                  <input
                    type="date"
                    min={todayIso()}
                    value={form.date}
                    onChange={(event) => updateField('date', event.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </Field>

                <Field label="Время" error={errors.time}>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {bookingTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => updateField('time', slot)}
                        aria-pressed={form.time === slot}
                        className={`rounded-lg border py-2.5 text-sm font-semibold transition-all duration-300 ${
                          form.time === slot
                            ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                            : 'border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-orange-500/60 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Комментарий (необязательно)">
                  <textarea
                    rows={3}
                    value={form.comment}
                    onChange={(event) => updateField('comment', event.target.value)}
                    placeholder="Например, есть царапины на заднем бампере"
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === 'submitting' ? 'Отправляем заявку...' : 'Отправить заявку'}
                </button>
                <p className="text-center text-xs leading-[1.5] text-zinc-500">
                  Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по записи.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-zinc-200">{label}</span>
      {children}
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

function BenefitItem({ icon: Icon, title, text }: BenefitItemProps) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-bold text-white">{title}</p>
        <p className="mt-1 text-sm leading-[1.5] text-zinc-400">{text}</p>
      </div>
    </li>
  );
}

interface SuccessStateProps {
  name: string;
  serviceName: string;
  date: string;
  time: string;
  onReset: () => void;
}

function SuccessState({ name, serviceName, date, time, onReset }: SuccessStateProps) {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });

  return (
    <div className="animate-fade-up flex flex-col items-center gap-6 py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
        <CheckCircle2 className="h-9 w-9" />
      </span>
      <div>
        <h3 className="text-2xl font-extrabold text-white">Заявка принята, {name.split(' ')[0]}!</h3>
        <p className="mt-3 text-zinc-400">Мы свяжемся с вами, чтобы подтвердить визит.</p>
      </div>
      <dl className="w-full divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-950 text-left">
        <SummaryRow label="Услуга" value={serviceName} />
        <SummaryRow label="Дата" value={formattedDate} />
        <SummaryRow label="Время" value={time} />
      </dl>
      <button
        type="button"
        onClick={onReset}
        className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-orange-500 hover:text-orange-400"
      >
        Записать другой автомобиль
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <dt className="text-sm text-zinc-400">{label}</dt>
      <dd className="text-right font-semibold text-white">{value}</dd>
    </div>
  );
}
