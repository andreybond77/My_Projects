// src/pages/CatalogPage.tsx
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { rickAndMortyProducts, Product } from '../data';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';

const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, incrementQuantity, decrementQuantity } = useCart();
  
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return rickAndMortyProducts;
    const query = searchQuery.toLowerCase();
    return rickAndMortyProducts.filter(product => 
      product.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className={`form-control mb-3 ${filteredProducts.length === 0 && searchQuery ? 'is-invalid' : ''}`}
          placeholder="Поиск товаров по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredProducts.length === 0 && searchQuery && (
          <p className="text-danger">
            <i className="bi bi-exclamation-circle"></i> Извините, по вашему запросу ничего не найдено
          </p>
        )}
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={addToCart}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;