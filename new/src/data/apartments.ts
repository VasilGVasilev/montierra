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

// Floor 1: 3 apartments (upper-right A1, lower-right A2, bottom-left A3)
// Floor 2: 2 apartments (left A4, right A5)
// Floor 3: 2 apartments (left A6, right A7)
// Floor 4: 1 penthouse (A8)
export const apartments: Apartment[] = [
  {
    id: 1,
    number: 'A1',
    floor: 1,
    type: '2BR',
    typeLabel: { bg: 'Двустаен', en: '2 Bedroom' },
    rooms: 2,
    area: 85.4,
    price: 199000,
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
    floor: 1,
    type: '3BR',
    typeLabel: { bg: 'Тристаен', en: '3 Bedroom' },
    rooms: 3,
    area: 115.6,
    price: 245000,
    status: 'available',
    description: {
      bg: 'Просторен тристаен апартамент на първи етаж с голяма частна градина и директен изход към двора.',
      en: 'Spacious 3-bedroom apartment on the first floor with a large private garden and direct yard access.',
    },
  },
  {
    id: 4,
    number: 'A4',
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
    id: 5,
    number: 'A5',
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
    id: 6,
    number: 'A6',
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
    id: 7,
    number: 'A7',
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
    id: 8,
    number: 'A8',
    floor: 4,
    type: '3BR',
    typeLabel: { bg: 'Тристаен', en: '3 Bedroom' },
    rooms: 3,
    area: 142.8,
    price: null,
    status: 'available',
    description: {
      bg: 'Пентхаус апартамент с огромна тераса, панорамна гледка към Витоша и две бани. Най-ексклузивното жилище в сградата.',
      en: 'Penthouse apartment with a vast terrace, panoramic views of Vitosha, and two bathrooms. The most exclusive residence in the building.',
    },
  },
];

// 2 enclosed garage units
export const garages: Garage[] = [
  { id: 1, number: 'G9', area: 34.5, price: 44000, status: 'available' },
  { id: 2, number: 'G10', area: 33.0, price: 42000, status: 'available' },
];

// 8 open parking spots
export const parkingSpots: Garage[] = [
  { id: 1, number: 'P1', area: 14.5, price: 17000, status: 'available' },
  { id: 2, number: 'P2', area: 14.5, price: 17000, status: 'available' },
  { id: 3, number: 'P3', area: 14.5, price: 17000, status: 'available' },
  { id: 4, number: 'P4', area: 14.5, price: 17000, status: 'reserved' },
  { id: 5, number: 'P5', area: 14.5, price: 17000, status: 'available' },
  { id: 6, number: 'P6', area: 14.5, price: 17000, status: 'available' },
  { id: 7, number: 'P7', area: 14.5, price: 17000, status: 'sold' },
  { id: 8, number: 'P8', area: 14.5, price: 17000, status: 'available' },
];

// 4 compact parking places
export const parkingPlaces: Garage[] = [
  { id: 1, number: 'PL1', area: 8.0, price: 10000, status: 'available' },
  { id: 2, number: 'PL2', area: 8.0, price: 10000, status: 'available' },
  { id: 3, number: 'PL3', area: 8.0, price: 10000, status: 'available' },
  { id: 4, number: 'PL4', area: 8.0, price: 10000, status: 'available' },
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
