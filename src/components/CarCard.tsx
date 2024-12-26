import React from 'react';
import { Car } from '../types/car';
import { Users, Fuel, Calendar, Gauge } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onRent: (car: Car) => void;
}

export function CarCard({ car, onRent }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.02] group">
      <div className="relative">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${car.price}/day
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{car.name}</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users size={18} className="text-blue-600" />
            </div>
            <span className="text-gray-600">{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Gauge size={18} className="text-blue-600" />
            </div>
            <span className="text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Fuel size={18} className="text-blue-600" />
            </div>
            <span className="text-gray-600">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar size={18} className="text-blue-600" />
            </div>
            <span className="text-gray-600">{car.year}</span>
          </div>
        </div>
        
        <button
          onClick={() => onRent(car)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Rent Now
        </button>
      </div>
    </div>
  );
}