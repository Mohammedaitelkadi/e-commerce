export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

export interface LocationError {
  code: number;
  message: string;
}