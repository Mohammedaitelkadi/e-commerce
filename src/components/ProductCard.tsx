import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="relative pb-[100%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover transform transition-transform hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all transform active:scale-95"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}