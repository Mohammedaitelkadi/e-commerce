export interface BookingDetails {
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  pickupLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export interface BookingFormData extends BookingDetails, PaymentDetails {}