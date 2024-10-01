export const countries = ['Russia', 'Island', 'Germany'];

export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const years = Array.from({ length: 75 }, (_, i) => new Date().getFullYear() - i);

import concert from '@shared/assets/categories/concert.png';
import sport from '@shared/assets/categories/sport.png';
import family from '@shared/assets/categories/family.png';
import theater from '@shared/assets/categories/theater.png';
import it from '@shared/assets/categories/IT.png';

export const categorie = ['Concert', 'Sport', 'Family', 'Theater'];
export const categories = [
  { title: 'Concert', image: concert },
  { title: 'Sport', image: sport },
  { title: 'Family', image: family },
  { title: 'Theater', image: theater },
  { title: 'IT', image: it },
];
