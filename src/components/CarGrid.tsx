import React from 'react';
import { Car } from '../types/car';
import { CarCard } from './CarCard';

interface CarGridProps {
  cars: Car[];
  onRent: (car: Car) => void;
}

export function CarGrid({ cars, onRent }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No cars found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onRent={onRent} />
      ))}
    </div>
  );
}