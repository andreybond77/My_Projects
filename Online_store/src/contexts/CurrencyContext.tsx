// src/contexts/CurrencyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Currency } from '../data';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('shmeckles');

  const setCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
  };

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};