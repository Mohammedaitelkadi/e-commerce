export interface Car {
  id: number;
  name: string;
  image: string;
  price: number;
  transmission: 'Manual' | 'Automatic';
  seats: number;
  fuelType: string;
  year: number;
  available: boolean;
}