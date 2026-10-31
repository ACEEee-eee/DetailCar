import { Armchair, Droplets, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';

export type ServiceCategory = 'Мойка' | 'Полировка' | 'Химчистка' | 'Защита';

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  priceFrom: boolean;
  duration: string;
  includes: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory | 'Автомобили';
  image: string;
}

export const serviceCategories: Record<ServiceCategory, LucideIcon> = {
  Мойка: Droplets,
  Полировка: Sparkles,
  Химчистка: Armchair,
  Защита: ShieldCheck,
};

export const services: Service[] = [
  {
    id: 'express-wash',
    category: 'Мойка',
    name: 'Бесконтактная мойка',
    description: 'Безопасная мойка двухфазным шампунем без прикосновений к лакокрасочному покрытию.',
    price: 900,
    priceFrom: true,
    duration: '1 ч',
    includes: ['Мойка кузова', 'Очистка колёсных дисков', 'Сушка воздухом'],
  },
  {
    id: 'complex-wash',
    category: 'Мойка',
    name: 'Комплексная мойка',
    description: 'Полная мойка кузова и подкапотного пространства с обработкой резиновых элементов.',
    price: 1500,
    priceFrom: false,
    duration: '1,5 ч',
    includes: ['Мойка кузова и днища', 'Чернение резины', 'Очистка стёкол', 'Сушка'],
    popular: true,
  },
  {
    id: 'polish-1',
    category: 'Полировка',
    name: 'Полировка в один этап',
    description: 'Выравнивание лакокрасочного слоя, устранение мелких царапин и матовости.',
    price: 8000,
    priceFrom: true,
    duration: '1 день',
    includes: ['Очистка кузова глиной', 'Однофазная полировка', 'Финишный воск'],
  },
  {
    id: 'polish-2',
    category: 'Полировка',
    name: 'Полировка в два этапа',
    description: 'Удаление глубоких царапин и паутинки. Результат, близкий к заводскому блеску.',
    price: 16000,
    priceFrom: true,
    duration: '2 дня',
    includes: ['Двухфазная полировка', 'Защита кузова', 'Контроль толщины покрытия'],
    popular: true,
  },
  {
    id: 'interior-seats',
    category: 'Химчистка',
    name: 'Химчистка сидений',
    description: 'Глубокая экстракция загрязнений и запахов с сидений и обивки.',
    price: 7000,
    priceFrom: true,
    duration: '3 ч',
    includes: ['Сиденья и спинки', 'Обработка антибактериальным составом', 'Сушка'],
  },
  {
    id: 'interior-full',
    category: 'Химчистка',
    name: 'Химчистка салона полная',
    description: 'Комплексная чистка всех поверхностей салона: потолок, двери, ковры, багажник.',
    price: 14000,
    priceFrom: true,
    duration: '1 день',
    includes: ['Потолок и пластик', 'Ковры и багажник', 'Озонация салона'],
  },
  {
    id: 'ceramic',
    category: 'Защита',
    name: 'Керамическое покрытие',
    description: 'Гидрофобный слой с защитой от реагентов, ультрафиолета и мелких повреждений до 3 лет.',
    price: 25000,
    priceFrom: true,
    duration: '2 дня',
    includes: ['Полировка кузова', 'Нанесение керамики в 2 слоя', 'Гарантия 3 года'],
    popular: true,
  },
  {
    id: 'ppf',
    category: 'Защита',
    name: 'Антигравийная плёнка (PPF)',
    description: 'Прозрачная полиуретановая плёнка на наиболее уязвимые участки кузова.',
    price: 12000,
    priceFrom: true,
    duration: 'от 1 дня',
    includes: ['Бампер и капот', 'Фары и зеркала', 'Гарантия 5 лет'],
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Ручная полировка кузова',
    category: 'Полировка',
    image: 'https://images.pexels.com/photos/6026083/pexels-photo-6026083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g2',
    title: 'Полировка чёрного автомобиля',
    category: 'Полировка',
    image: 'https://images.pexels.com/photos/14231684/pexels-photo-14231684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g3',
    title: 'Мойка премиум-автомобиля',
    category: 'Мойка',
    image: 'https://images.pexels.com/photos/6872176/pexels-photo-6872176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g4',
    title: 'Капли после мойки на белом кузове',
    category: 'Мойка',
    image: 'https://images.pexels.com/photos/6873177/pexels-photo-6873177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g5',
    title: 'Реставрация фар',
    category: 'Полировка',
    image: 'https://images.pexels.com/photos/4870702/pexels-photo-4870702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g6',
    title: 'Жёлтый спорткар',
    category: 'Автомобили',
    image: 'https://images.pexels.com/photos/30849335/pexels-photo-30849335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g7',
    title: 'Зелёный суперкар',
    category: 'Автомобили',
    image: 'https://images.pexels.com/photos/4194021/pexels-photo-4194021.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g8',
    title: 'Синий спорткар у выставки',
    category: 'Автомобили',
    image: 'https://images.pexels.com/photos/16624911/pexels-photo-16624911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'g9',
    title: 'Чёрный люксовый автомобиль',
    category: 'Защита',
    image: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const heroImage =
  'https://images.pexels.com/photos/38570/lamborghini-car-speed-prestige-38570.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';

export const aboutImage =
  'https://images.pexels.com/photos/6870296/pexels-photo-6870296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const studioValues = [
  {
    title: 'Бережность к покрытию',
    text: 'Двухфазная мойка, чистые микрофибры и контроль толщины лака на каждом этапе работ.',
  },
  {
    title: 'Сертифицированные мастера',
    text: 'Наши специалисты проходят обучение у производителей составов и регулярно повышают квалификацию.',
  },
  {
    title: 'Прозрачные цены',
    text: 'Стоимость фиксируем до начала работ. Никаких доплат после того, как автомобиль принят.',
  },
  {
    title: 'Гарантия результата',
    text: 'Даём письменную гарантию на керамику, PPF и полировку и бесплатно устраняем замечания.',
  },
];

export const studioStats = [
  { value: '8', label: 'лет на рынке' },
  { value: '12 000+', label: 'автомобилей обработано' },
  { value: '4.9', label: 'средняя оценка клиентов' },
];

export const studioContacts = {
  phone: '+7 (900) 123-45-67',
  phoneHref: 'tel:+79001234567',
  email: 'hello@detailpro.demo',
  address: 'г. Москва, ул. Автозаводская, 14, стр. 2',
  hours: 'Ежедневно, 09:00 - 21:00',
};

export const bookingTimeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
