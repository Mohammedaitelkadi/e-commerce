import React from 'react';
import { MapPin } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';

export function LocationDisplay() {
  const { location, error, loading } = useLocation();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <MapPin size={18} className="animate-pulse" />
        <span>Detecting location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <MapPin size={18} />
        <span>{error.message}</span>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-blue-600">
      <MapPin size={18} />
      <span>{location.city}, {location.country}</span>
    </div>
  );
}