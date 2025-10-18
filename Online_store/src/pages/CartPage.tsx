// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { currencyInfo } from '../data';
import StandardButton from '../components/StandardButton';

const CartPage: React.FC = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCart();
  const { currentCurrency } = useCurrency();
  const currencySymbol = currencyInfo[currentCurrency].symbol;

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.prices[currentCurrency] * item.quantity),
    0
  );

  const handleCheckout = () => {
    alert('Заказ оформлен! Спасибо за покупку!');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Корзина пуста</h4>
          <p>В вашей корзине пока нет товаров. Перейдите в каталог и добавьте что-нибудь!</p>
          <a href="/" className="btn btn-primary">Перейти к каталогу</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Ваша корзина</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Товар</th>
              <th>Цена за шт.</th>
              <th>Количество</th>
              <th>Общая цена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const itemPrice = item.product.prices[currentCurrency];
              const itemTotal = itemPrice * item.quantity;
              return (
                <tr key={`${item.product.id}`}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.product.imageUrl}
                        className="img-fluid rounded me-3"
                        alt={item.product.name}
                        style={{ height: '60px', objectFit: 'cover' }}
                      />
                      <div>
                        <h5 className="mb-0">{item.product.name}</h5>
                        <p className="mb-0 text-muted">{item.product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{itemPrice.toFixed(2)} {currencySymbol}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <StandardButton
                        BGcolor="warning"
                        icon="dash-lg"
                        title="Уменьшить"
                        btnType="iconButton"
                        onClick={() => decrementQuantity(item.product)}
                        className="btn-sm"
                      />
                      <span className="btn btn-outline-secondary btn-sm disabled">
                        {item.quantity}
                      </span>
                      <StandardButton
                        BGcolor="success"
                        icon="plus-lg"
                        title="Увеличить"
                        btnType="iconButton"
                        onClick={() => incrementQuantity(item.product)}
                        className="btn-sm"
                      />
                    </div>
                  </td>
                  <td><strong>{itemTotal.toFixed(2)} {currencySymbol}</strong></td>
                  <td>
                    <StandardButton
                      BGcolor="danger"
                      icon="trash-fill"
                      title="Удалить"
                      btnType="iconButton"
                      onClick={() => removeFromCart(item.product.id)}
                      className="btn-sm"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 offset-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Итого: {total.toFixed(2)} {currencySymbol}</h5>
              <div className="d-grid gap-2">
                <StandardButton
                  BGcolor="success"
                  title="Оформить заказ"
                  btnType="textButton"
                  onClick={handleCheckout}
                  className="w-100"
                />
                <StandardButton
                  BGcolor="secondary"
                  title="Продолжить покупки"
                  btnType="textButton"
                  onClick={() => window.history.back()}
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;