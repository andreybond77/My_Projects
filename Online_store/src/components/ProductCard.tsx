// src/components/ProductCard.tsx
import React, { memo } from 'react';
import { Product } from '../data';
import StandardButton from './StandardButton';
import { useCurrency } from '../contexts/CurrencyContext';
import { currencyInfo } from '../data';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  onAddToCart,
  onIncrement,
  onDecrement
}) => {
  const { currentCurrency } = useCurrency();
  const currentPrice = product.prices[currentCurrency];
  const currencySymbol = currencyInfo[currentCurrency].symbol;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.imageUrl}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text flex-grow-1">{product.description}</p>
        <p className="card-text">
          <strong>Цена: {currentPrice.toFixed(2)} {currencySymbol}</strong>
        </p>
        <div className="d-flex flex-wrap gap-2 mt-auto">
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-info flex-fill"
          >
            <i className="bi bi-eye-fill me-1"></i> Подробнее
          </Link>
          <StandardButton
            BGcolor="primary"
            icon="basket-fill"
            title="Добавить в корзину"
            btnType="iconButton"
            onClick={() => onAddToCart(product)}
          />
          <StandardButton
            BGcolor="success"
            icon="plus-lg"
            title="Увеличить"
            btnType="iconButton"
            onClick={() => onIncrement(product)}
          />
          <StandardButton
            BGcolor="warning"
            icon="dash-lg"
            title="Уменьшить"
            btnType="iconButton"
            onClick={() => onDecrement(product)}
          />
        </div>
      </div>
    </div>
  );
});

export default ProductCard;