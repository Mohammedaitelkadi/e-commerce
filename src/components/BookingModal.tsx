import React from 'react';
import { X, MapPin } from 'lucide-react';
import { Car } from '../types/car';
import { PaymentForm } from './PaymentForm';
import { BookingDetails } from '../types/booking';
import { calculateTotalAmount } from '../utils/booking';
import { useLocation } from '../hooks/useLocation';

interface BookingModalProps {
  car: Car;
  onClose: () => void;
  onSubmit: (bookingData: BookingDetails) => void;
}

export function BookingModal({ car, onClose, onSubmit }: BookingModalProps) {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const { location } = useLocation();

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const totalDays = React.useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const totalAmount = calculateTotalAmount(car.price, totalDays);

  const bookingDetails: BookingDetails = {
    startDate,
    endDate,
    totalDays,
    totalAmount,
    pickupLocation: location ? {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address || ''
    } : undefined
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Book {car.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rental Details</h3>
            <div className="space-y-4">
              {location && (
                <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                  <MapPin className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-blue-800">Pickup Location</p>
                    <p className="text-sm text-blue-600">{location.address}</p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={startDate}
                  onChange={(e) => handleDateChange(e.target.value, endDate)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  min={startDate || new Date().toISOString().split('T')[0]}
                  value={endDate}
                  onChange={(e) => handleDateChange(startDate, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Duration: {totalDays} days</p>
                <p className="text-sm text-gray-600">Rate: ${car.price}/day</p>
                <p className="text-lg font-semibold mt-2">Total: ${totalAmount}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <PaymentForm 
              bookingDetails={bookingDetails}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}