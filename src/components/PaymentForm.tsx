import React, { useState } from 'react';
import { CreditCard, Calendar, User, Lock } from 'lucide-react';
import { BookingDetails, PaymentDetails } from '../types/booking';
import { formatCardNumber, formatExpiryDate } from '../utils/formatting';

interface PaymentFormProps {
  bookingDetails: BookingDetails;
  onSubmit: (bookingDetails: BookingDetails) => void;
}

export function PaymentForm({ bookingDetails, onSubmit }: PaymentFormProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit(bookingDetails);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            maxLength={19}
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails,
              cardNumber: formatCardNumber(e.target.value)
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              maxLength={5}
              value={paymentDetails.expiryDate}
              onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                expiryDate: formatExpiryDate(e.target.value)
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="MM/YY"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              maxLength={3}
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                cvv: e.target.value.replace(/\D/g, '')
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={paymentDetails.name}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails,
              name: e.target.value
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {isProcessing ? 'Processing...' : `Pay $${bookingDetails.totalAmount}`}
      </button>
    </form>
  );
}