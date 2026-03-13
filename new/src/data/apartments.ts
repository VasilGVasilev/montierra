export type ApartmentStatus = 'available' | 'reserved' | 'sold';
export type ApartmentType = '1BR' | '2BR' | '3BR' | 'studio';

export interface Apartment {
  id: number;
  number: string;
  floor: number;
  type: ApartmentType;
  typeLabel: { bg: string; en: string };
  rooms: number;
  area: number; // sq.m.
  price: number | null; // null = price on request
  status: ApartmentStatus;
  description: { bg: string; en: string };
}

export interface Garage {
  id: number;
  number: string;
  area: number;
  price: number | null;
  status: ApartmentStatus;
}

export const apartments: Apartment[] = [
  {
    id: 1,
    number: 'A1',
    floor: 1,
    type: '2BR',
    typeLabel: { bg: 'Двустаен', en: '2 Bedroom' },
    rooms: 2,
    area: 85.4,
    price: 185000,
    status: 'available',
    description: {
      bg: 'Просторен двустаен апартамент на първи етаж с частна градина и директен достъп до двора.',
      en: 'Spacious 2-bedroom apartment on the first floor with a private garden and direct yard access.',
    },
  },
  {
    id: 2,
    number: 'A2',
    floor: 1,
    type: '1BR',
    typeLabel: { bg: 'Едностаен', en: '1 Bedroom' },
    rooms: 1,
    area: 62.3,
    price: 135000,
    status: 'sold',
    description: {
      bg: 'Уютен едностаен апартамент с функционално разпределение и южно изложение.',
      en: 'Cozy 1-bedroom apartment with a functional layout and southern exposure.',
    },
  },
  {
    id: 3,
    number: 'A3',
    floor: 2,
    type: '2BR',
    typeLabel: { bg: 'Двустаен', en: '2 Bedroom' },
    rooms: 2,
    area: 89.7,
    price: 198000,
    status: 'available',
    description: {
      bg: 'Двустаен апартамент с панорамна гледка към Витоша и просторна дневна зона.',
      en: '2-bedroom apartment with a panoramic view of Vitosha and a spacious living area.',
    },
  },
  {
    id: 4,
    number: 'A4',
    floor: 2,
    type: '3BR',
    typeLabel: { bg: 'Тристаен', en: '3 Bedroom' },
    rooms: 3,
    area: 120.5,
    price: null,
    status: 'available',
    description: {
      bg: 'Луксозен тристаен апартамент с две бани, голяма тераса и гледка към планината.',
      en: 'Luxurious 3-bedroom apartment with two bathrooms, a large terrace, and mountain views.',
    },
  },
  {
    id: 5,
    number: 'A5',
    floor: 3,
    type: '2BR',
    typeLabel: { bg: 'Двустаен', en: '2 Bedroom' },
    rooms: 2,
    area: 87.1,
    price: 195000,
    status: 'reserved',
    description: {
      bg: 'Двустаен апартамент на трети етаж с отлична осветеност и балкон с гледка.',
      en: '2-bedroom apartment on the third floor with excellent natural light and a balcony with views.',
    },
  },
  {
    id: 6,
    number: 'A6',
    floor: 3,
    type: '1BR',
    typeLabel: { bg: 'Едностаен', en: '1 Bedroom' },
    rooms: 1,
    area: 64.8,
    price: 142000,
    status: 'available',
    description: {
      bg: 'Компактен и модерен едностаен апартамент, идеален за млади професионалисти.',
      en: 'Compact and modern 1-bedroom apartment, ideal for young professionals.',
    },
  },
  {
    id: 7,
    number: 'A7',
    floor: 4,
    type: '3BR',
    typeLabel: { bg: 'Тристаен', en: '3 Bedroom' },
    rooms: 3,
    area: 135.2,
    price: null,
    status: 'available',
    description: {
      bg: 'Пентхаус тристаен апартамент с голяма тераса, панорамна гледка и две бани. Най-ексклузивният в сградата.',
      en: 'Penthouse 3-bedroom apartment with a large terrace, panoramic views, and two bathrooms. The most exclusive in the building.',
    },
  },
  {
    id: 8,
    number: 'A8',
    floor: 4,
    type: '2BR',
    typeLabel: { bg: 'Двустаен', en: '2 Bedroom' },
    rooms: 2,
    area: 91.3,
    price: 210000,
    status: 'available',
    description: {
      bg: 'Двустаен апартамент на последен етаж с висок таван и уникален характер.',
      en: '2-bedroom apartment on the top floor with high ceilings and unique character.',
    },
  },
];

export const garages: Garage[] = [
  { id: 1, number: 'G1', area: 18.5, price: 28000, status: 'sold' },
  { id: 2, number: 'G2', area: 17.8, price: 26000, status: 'available' },
  { id: 3, number: 'G3', area: 19.2, price: 29000, status: 'reserved' },
  { id: 4, number: 'G4', area: 18.0, price: 27000, status: 'available' },
  { id: 5, number: 'G5', area: 18.3, price: 27500, status: 'available' },
  { id: 6, number: 'G6', area: 17.5, price: 25000, status: 'available' },
  { id: 7, number: 'G7', area: 19.0, price: 28500, status: 'sold' },
  { id: 8, number: 'G8', area: 18.8, price: 28000, status: 'available' },
];

export const apartmentTypes: { value: ApartmentType | 'all'; label: { bg: string; en: string } }[] = [
  { value: 'all', label: { bg: 'Всички', en: 'All' } },
  { value: '1BR', label: { bg: 'Едностаен', en: '1 Bedroom' } },
  { value: '2BR', label: { bg: 'Двустаен', en: '2 Bedroom' } },
  { value: '3BR', label: { bg: 'Тристаен', en: '3 Bedroom' } },
];

export const statusOptions: { value: ApartmentStatus | 'all'; label: { bg: string; en: string } }[] = [
  { value: 'all', label: { bg: 'Всички', en: 'All' } },
  { value: 'available', label: { bg: 'Свободен', en: 'Available' } },
  { value: 'reserved', label: { bg: 'Резервиран', en: 'Reserved' } },
  { value: 'sold', label: { bg: 'Продаден', en: 'Sold' } },
];
