import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminContextProvider } from './Context/AdminContext';
import { ProductsContextProvider } from './Context/ProductsContext';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <AdminContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </AdminContextProvider>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);
