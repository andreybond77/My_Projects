// src/pages/ProductDetailPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rickAndMortyProducts, Product } from '../data';
import { useCurrency } from '../contexts/CurrencyContext';
import { currencyInfo } from '../data';
import StandardButton from '../components/StandardButton';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCurrency } = useCurrency();
  const { addToCart } = useCart();
  
  const productId = parseInt(id || '0', 10);
  const product = rickAndMortyProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Товар не найден!</h4>
          <p>К сожалению, товар с ID {productId} не существует.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/')}
          >
            Вернуться к каталогу
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = product.prices[currentCurrency];
  const currencySymbol = currencyInfo[currentCurrency].symbol;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            className="img-fluid rounded shadow"
            alt={product.name}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{product.name}</h1>
          <p className="lead">{product.description}</p>
          <div className="mb-4">
            <h4 className="text-primary">Цена: {currentPrice.toFixed(2)} {currencySymbol}</h4>
          </div>
          <div className="d-grid gap-2">
            <StandardButton
              BGcolor="primary"
              icon="basket-fill"
              title="Добавить в корзину"
              btnType="textButton"
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
              className="w-100"
            />
            <StandardButton
              BGcolor="secondary"
              title="Вернуться к каталогу"
              btnType="textButton"
              onClick={() => navigate('/')}
              className="w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;