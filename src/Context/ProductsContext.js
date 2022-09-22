import { createContext, useReducer } from 'react'

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                products: action.payload
            }
        case 'ADD_PRODUCTS':
            return {
                products: [action.payload, ...state.products]
            }
        case 'EDIT_PRODUCT':
            const productsWithoutTheUpdatedOne = state.products.filter(product => product._id !== action.payload._id);
            return {
                products: [action.payload, ...productsWithoutTheUpdatedOne]
            }
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter(product => product._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    })

    return (
        <ProductsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}