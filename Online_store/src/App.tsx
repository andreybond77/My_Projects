// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
};

export default App;