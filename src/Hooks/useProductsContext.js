import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";

export const useProductsContext = () => {
    const context = useContext(ProductsContext);

    if (!context) {
        throw Error('useProductsContext must be used inside a ProductContextProvider');
    }

    return context;
}