// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../data';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (product: Product) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item => item.product.id !== product.id);
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};