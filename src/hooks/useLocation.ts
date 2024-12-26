import { useState, useEffect } from 'react';
import { Location, LocationError } from '../types/location';
import { reverseGeocode } from '../services/geocoding';

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by your browser' });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const addressInfo = await reverseGeocode(latitude, longitude);
          
          setLocation({
            latitude,
            longitude,
            ...addressInfo
          });
        } catch (err) {
          setError({ code: 1, message: 'Failed to get address information' });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError({ code: error.code, message: error.message });
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading };
}