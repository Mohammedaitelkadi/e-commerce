import React from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import type { Product } from '../types';

export function ProductGrid() {
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // TODO: Implement cart functionality
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}