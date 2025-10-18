// src/components/Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { currencyInfo } from '../data';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const { currentCurrency, setCurrency } = useCurrency();

  const currencies = ['shmeckles', 'credits', 'flurbos'] as const;

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Магазин Рик и Морти</h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active fw-bold' : 'text-white'}`
                  }
                >
                  Каталог
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/cart" 
                  className={({ isActive }) => 
                    `nav-link position-relative ${isActive ? 'active fw-bold' : 'text-white'}`
                  }
                >
                  <i className="bi bi-cart-fill"></i> Корзина
                  {getTotalItems() > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {getTotalItems()}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="mt-3">
          <div className="btn-group" role="group">
            {currencies.map((currency) => (
              <button
                key={currency}
                type="button"
                className={`btn ${currentCurrency === currency ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setCurrency(currency)}
              >
                {currencyInfo[currency].symbol} {currencyInfo[currency].name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;