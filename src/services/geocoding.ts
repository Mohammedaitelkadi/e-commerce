const NOMINATIM_API = 'https://nominatim.openstreetmap.org';

export async function reverseGeocode(latitude: number, longitude: number) {
  const response = await fetch(
    `${NOMINATIM_API}/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch address information');
  }

  const data = await response.json();
  
  return {
    address: data.display_name,
    city: data.address.city || data.address.town || data.address.village,
    country: data.address.country
  };
}