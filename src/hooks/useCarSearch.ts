import { useState, useMemo } from 'react';
import { Car } from '../types/car';

export function useCarSearch(cars: Car[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return cars;

    return cars.filter((car) => 
      car.name.toLowerCase().includes(term) ||
      car.transmission.toLowerCase().includes(term) ||
      car.fuelType.toLowerCase().includes(term)
    );
  }, [cars, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCars,
  };
}