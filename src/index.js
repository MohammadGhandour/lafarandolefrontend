import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductsContextProvider } from './Context/ProductsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProductsContextProvider>
    <App />
  </ProductsContextProvider>
);
