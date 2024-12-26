import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 text-slate-600">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="divide-y divide-slate-200">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 rounded-md hover:bg-slate-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-slate-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
          </div>
          <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors transform active:scale-95">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}