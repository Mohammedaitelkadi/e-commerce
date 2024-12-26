import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { CartPage } from './components/CartPage';

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Navbar onCartClick={() => setShowCart(!showCart)} />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showCart ? (
            <CartPage />
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Featured Products</h1>
              <ProductGrid />
            </>
          )}
        </div>
      </main>
    </div>
  );
}