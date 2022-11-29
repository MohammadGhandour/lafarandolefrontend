import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminContextProvider } from './Context/AdminContext';
import { ProductsContextProvider } from './Context/ProductsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AdminContextProvider>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </AdminContextProvider>
);
