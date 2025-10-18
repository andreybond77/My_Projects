// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.tsx';
import { CartProvider } from './contexts/CartContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import "./index.css";

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <CurrencyProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </CurrencyProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}