// src/components/Cart.tsx
import React from 'react';
import { CartProps, CartItem } from '../types'; // Импорт типов
import StandardButton from './StandardButton';
import { useCurrency } from '../contexts/CurrencyContext'; // Импорт хука контекста
import { currencyInfo } from '../data'; // Импорт информации о валюте

const Cart: React.FC<CartProps> = ({
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  isOpen,
  onClose,
  onCheckout
}) => {
  if (!isOpen) return null;

  // Получаем текущую валюту из контекста
  const { currentCurrency } = useCurrency();
  // Получаем символ валюты
  const currencySymbol = currencyInfo[currentCurrency].symbol;

  // Рассчитываем общую сумму в текущей валюте
  const total = cartItems.reduce((sum, item) => sum + (item.product.prices[currentCurrency] * item.quantity), 0);

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Корзина покупок</h5>
            <StandardButton
              BGcolor="secondary"
              icon="x-lg"
              title="Закрыть"
              btnType="iconButton"
              onClick={onClose}
              className="btn-close"
            />
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p className="text-center">Корзина пуста</p>
            ) : (
              <>
                <div className="list-group">
                  {cartItems.map((item) => {
                    // Получаем цену за единицу в текущей валюте
                    const itemPrice = item.product.prices[currentCurrency];
                    // Получаем стоимость за количество в текущей валюте
                    const itemTotal = itemPrice * item.quantity;
                    return (
                      <div key={item.product.id} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-2">
                            <img
                              src={item.product.imageUrl}
                              className="img-fluid rounded"
                              alt={item.product.name}
                              style={{ height: '50px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-4">
                            <h6 className="mb-1">{item.product.name}</h6>
                            {/* Отображаем цену за единицу и символ валюты */}
                            <small className="text-muted">{itemPrice.toFixed(2)} {currencySymbol}</small>
                          </div>
                          <div className="col-3">
                            <div className="btn-group" role="group">
                              <StandardButton
                                BGcolor="warning"
                                icon="dash-lg"
                                title="Уменьшить"
                                btnType="iconButton"
                                onClick={() => onDecrement(item.product)}
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
                                onClick={() => onIncrement(item.product)}
                                className="btn-sm"
                              />
                            </div>
                          </div>
                          <div className="col-2">
                            {/* Отображаем стоимость за количество и символ валюты */}
                            <strong>{itemTotal.toFixed(2)} {currencySymbol}</strong>
                          </div>
                          <div className="col-1">
                            <StandardButton
                              BGcolor="danger"
                              icon="trash-fill"
                              title="Удалить"
                              btnType="iconButton"
                              onClick={() => onRemove(item.product.id)}
                              className="btn-sm"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 p-3 bg-light rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Отображаем итоговую сумму и символ валюты */}
                    <h5 className="mb-0">Итого: {total.toFixed(2)} {currencySymbol}</h5>
                    <StandardButton
                      BGcolor="success"
                      title="Оформить заказ"
                      btnType="textButton"
                      onClick={onCheckout}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <StandardButton
              BGcolor="secondary"
              title="Закрыть"
              btnType="textButton"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;