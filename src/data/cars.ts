import { Car } from '../types/car';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80',
    price: 150,
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Electric',
    year: 2023,
    available: true,
  },
  {
    id: 2,
    name: 'BMW 3 Series',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80',
    price: 120,
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Petrol',
    year: 2022,
    available: true,
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80',
    price: 130,
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Diesel',
    year: 2023,
    available: true,
  },
];